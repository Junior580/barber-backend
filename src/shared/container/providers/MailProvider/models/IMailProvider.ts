import ISendMailDTO from '../dtos/ISendMailDTO'

export default interface IMailProvider {
  sendMailMessage({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void>
}
