import { createGiftSteps } from '../../../services/meli-regalos/createGiftSteps'
import { getGiftById } from '../../../constants/queries/getGiftById'
import { service } from '../../../services/service'
import { status } from '../../../services/meli-regalos/status'
import { deleteTestData } from '../../../services/delete'

export const stepOne = () => {
  describe('Paso 1 [Creación de regalo]', () => {
    let id

    it('Crear regalo', async () => {
      let response = await createGiftSteps.StepOne()
      id = response.id
      expect(response, 'No hubo response').to.exist
      expect(response.success, 'No hubo éxito en StepOne [ERROR]').to.equal(
        true
      )
      expect(
        response,
        'El objeto de respuesta es erroneo [ERROR]'
      ).to.have.all.keys('success', 'message', 'id')
      expect(id, 'Vino ID vacío [ERROR]').to.not.equal(null)
      const data = await service.POST(getGiftById, {
        id: id
      })
      response = data.data.data.getGiftById
      expect(
        response.senderName,
        'El senderName no se guardo correctamente [ERROR]'
      ).to.equal('Marquiños')
      expect(
        response.receiverName,
        'El receiverName no se guardo correctamente [ERROR]'
      ).to.include('Micaela')
      expect(await status.IsInProgress(id), 'El estado no esta inProgress').to
        .be.true
    })
    it('Modificar regalo', async () => {
      let response = await createGiftSteps.StepOne(id)
      expect(response, 'No hubo response').to.exist
      expect(response.success, 'No hubo éxito en StepOne [ERROR]').to.equal(
        true
      )
      expect(
        response,
        'El objeto de respuesta es erroneo [ERROR]'
      ).to.have.all.keys('success', 'message', 'id')

      const data = await service.POST(getGiftById, {
        id: id
      })
      response = data.data.data.getGiftById
      expect(
        response.senderName,
        'El senderName no se guardo correctamente [ERROR]'
      ).to.equal('Marcos')
      expect(
        response.receiverName,
        'El receiverName no se guardo correctamente [ERROR]'
      ).to.include('Fabiana')
      expect(await status.IsInProgress(id), 'El estado no esta inProgress').to
        .be.true
    })
    after('Borrado de datos', async () => {
      await deleteTestData.AllSteps(id)
    })
  })
}
