import mongoose from 'mongoose'
const Schema = mongoose.Schema

const loginSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
  },
  inDate: {
    type: Date
  }
})

const Login = mongoose.model('login', loginSchema, 'logins')

export { Login }
