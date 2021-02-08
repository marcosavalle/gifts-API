import { createGiftSteps } from '../../../services/meli-regalos/createGiftSteps'
import { status } from '../../../services/meli-regalos/status'
import { deleteTestData } from '../../../services/delete'

export const stepOne = () => {
  describe('Paso 1 [Creación de regalo]', () => {
    let id
    before(async () => {
      const response = await createGiftSteps.StepOne()
      id = response.id
    })
    it('Crear sin senderName', async () => {
      const response = await createGiftSteps.StepOneCustom({
        input: {
          senderName: '',
          receiverName: 'Fabiana'
        }
      })
      expect(response, 'No hubo response').to.exist
      expect(
        response.success,
        'Se creó un regalo sin senderName [ERROR]'
      ).to.equal(false)
      expect(
        response,
        'El objeto de respuesta es erroneo [ERROR]'
      ).to.have.include.keys('success', 'message')
    })
    it('Crear sin receiverName', async () => {
      const response = await createGiftSteps.StepOneCustom({
        input: {
          senderName: 'Marcos',
          receiverName: ''
        }
      })
      expect(response, 'No hubo response').to.exist
      expect(
        response.success,
        'Se creó un regalo sin senderName [ERROR]'
      ).to.equal(false)
      expect(
        response,
        'El objeto de respuesta es erroneo [ERROR]'
      ).to.have.include.keys('success', 'message')
    })
    it('Modificar sin senderName', async () => {
      const response = await createGiftSteps.StepOneCustom({
        input: {
          giftId: id,
          senderName: '',
          receiverName: 'Fabiana'
        }
      })
      expect(response, 'No hubo response').to.exist
      expect(
        response.success,
        'Se modificó un regalo sin senderName [ERROR]'
      ).to.equal(false)
      expect(
        response,
        'El objeto de respuesta es erroneo [ERROR]'
      ).to.have.include.keys('success', 'message')
      expect(await status.IsInProgress(id), 'El estado no esta inProgress').to
        .be.true
    })
    it('Modificar sin receiverName', async () => {
      const response = await createGiftSteps.StepOneCustom({
        input: {
          giftId: id,
          senderName: 'Marcos',
          receiverName: ''
        }
      })
      expect(response, 'No hubo response').to.exist
      expect(
        response.success,
        'Se modificó un regalo sin receiverName [ERROR]'
      ).to.equal(false)
      expect(
        response,
        'El objeto de respuesta es erroneo [ERROR]'
      ).to.have.include.keys('success', 'message')
      expect(await status.IsInProgress(id), 'El estado no esta inProgress').to
        .be.true
    })
    after('Borrado de datos', async () => {
      await deleteTestData.AllSteps(id)
    })
  })
}
