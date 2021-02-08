import axios from 'axios'
import { url } from '../constants/url'
const urlLogin = 'http://localhost:8000/login'

export class service {
  static async getToken() {
    return await axios.get(urlLogin)
  }

  static async POST(query, variables) {
    try {
      const response = await axios({
        url: url,
        method: 'post',
        data: {
          query: query,
          variables
        },
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`
        }
      })

      return response
    } catch (error) {
      if (error.response) return console.log(error.response.data)
    }
  }
}
