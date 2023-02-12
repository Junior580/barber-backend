import { AppDataSourceMongo } from '../../../../../shared/infra/typeorm/data-source'
import Notification from '../schemas/Notification'

import INotificationsRepository from '../../../repositories/interface/INotificationsRepository'
import ICreateNotificationDTO from '../../../dtos/ICreateNotificationsDTO'

export const notificationRepository =
  AppDataSourceMongo.getRepository(Notification)

export default class NotificationsRepository
  implements INotificationsRepository
{
  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = notificationRepository.create({
      content,
      recipient_id,
    })
    await notificationRepository.save(notification)
    return notification
  }
}
