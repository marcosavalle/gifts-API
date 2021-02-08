import Gql from '../../../services/gql-service'
import { User } from '../../../models/user.model'
import { isEmpty } from '../../../helpers/verifyers'
import validator from 'validator'
import Joi from 'joi'
const gql = new Gql()

export const updateUser = async (parent, { input }) => {
  gql.joi(() => {
    const schema = Joi.object({
      name: Joi.string().min(2).max(20),
      lastName: Joi.string().min(2).max(20),
      email: Joi.string().email(),
      phone: Joi.number(),
      avatarUrl: Joi.string().uri(),
      meliId: Joi.number()
    })
    return schema.validate(input, { allowUnknown: true })
  })

  gql.verify(async () => {
    const msj = []

    if (isEmpty(input.id) || !validator.isMongoId(input.id)) {
      msj.push('Se debe ingresar id de usuario')
    } else {
      const user = await User.findById(input.id, '_id')
      if (!user._id) {
        msj.push('Se debe ingresar un id de usuario existente')
      }
    }

    if (isEmpty(input.name)) {
      msj.push('El usuario debe tener un nombre')
    }

    if (isEmpty(input.lastName)) {
      msj.push('El usuario debe tener un apellido')
    }

    if (!isEmpty(input.email) && !validator.isEmail(input.email)) {
      msj.push('El usuario debe tener un email correcto')
    }

    if (isEmpty(input.meliId)) {
      msj.push('El usuario debe tener una cuenta en Mercado Libre')
    }

    if (msj[0]) {
      return msj
    } else {
      return true
    }
  })

  return gql.mutation(async sess => {
    const result = await User.findByIdAndUpdate({ _id: input.id }, input, {
      new: true
    }).session(sess)
    return [`${result.name} ${result.lastName} se actualizó correctamente`]
  })
}
