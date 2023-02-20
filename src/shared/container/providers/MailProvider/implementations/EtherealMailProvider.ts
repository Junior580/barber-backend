import nodemailer, { Transporter } from 'nodemailer'
import ISendMailDTO from '../dtos/ISendMailDTO'
import { IMailTemplateProvider } from '../../MailTemplateProvider/models/IMailTemplateProvider'
import IMailProvider from '../models/IMailProvider'

export class EtherealMailProvider implements IMailProvider {
  private client: Transporter

  constructor(private mailTemplateProvider: IMailTemplateProvider) {
    // nodemailer.createTestAccount().then(account => {
    //   const transporter = nodemailer.createTransport({
    //     host: account.smtp.host,
    //     port: account.smtp.port,
    //     secure: account.smtp.secure,
    //     auth: {
    //       user: account.user,
    //       pass: account.pass,
    //     },
    //   })
    //   this.client = transporter
    // })
  }

  public async sendMailMessage({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    nodemailer.createTestAccount(async (err, account) => {
      if (err) {
        console.error('Failed to create a testing account. ' + err.message)
        return process.exit(1)
      }

      console.log('Credentials obtained, sending message...')

      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      })

      const message = {
        from: {
          name: from?.name || 'Equipe GoBarber',
          address: from?.email || 'equipe@gobarber.com.br',
        },
        to: { name: to.name, address: to.email },
        subject,
        html: await this.mailTemplateProvider.parse(templateData),
      }

      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log('Error occurred. ' + err.message)
          return process.exit(1)
        }

        console.log('Message sent: %s', info.messageId)
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
      })
    })
  }
}
