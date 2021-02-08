import nodemailer from 'nodemailer'
import { giftAccepted } from './dependencies/gift-accepted.mailing'
import { giftRejected } from './dependencies/gift-rejected.mailing'

class Mailing {
  to(text) {
    this.toText = text
  }

  subject(text) {
    this.subjectText = text
  }

  attachFiles(array) {
    this.attachFilesArray = array
  }

  body(text) {
    this.bodyText = text
  }

  htmlBody(text) {
    this.htmlBodyText = text
  }

  async send() {
    const result = {
      success: true,
      message: []
    }

    for (let i = 0; i < 3; i++) {
      try {
        if (!this.toText || !this.subjectText) {
          result.message = false
          result.message.push('Se deben completar to y subject')
        }

        if (!this.bodyText && !this.htmlBodyText) {
          result.message = false
          result.message.push('Se debe incluir un body o htmlBody')
        }

        if (this.bodyText && this.htmlBodyText) {
          result.message = false
          result.message.push('Se debe incluir un body o htmlBody')
        }

        if (result.success) {
          const message = {
            to: this.toText,
            subject: this.subjectText
          }
          if (this.bodyText) {
            message.text = this.bodyText
          }
          if (this.htmlBodyText) {
            message.html = this.htmlBodyText
          }
          if (this.attachFilesArray) {
            message.attachments = this.attachFilesArray
          }

          const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
              user: process.env.EMAIL_SENDER,
              pass: process.env.EMAIL_SENDER_PASS
            }
          })

          const info = await transporter.sendMail(message)
          result.message.push(`Email ${info.messageId} enviado correctamente`)
        }

        break
      } catch (error) {
        result.success = false
        result.message = ['Server Error: Email no enviado']
      }
    }

    return result
  }

  static async giftAccepted(giftId) {
    if (process.env.MAILING === 'false') {
      return
    }

    return await giftAccepted(giftId)
  }

  static async giftRejected(giftId) {
    if (process.env.MAILING === 'false') {
      return
    }

    return await giftRejected(giftId)
  }
}

export default Mailing
