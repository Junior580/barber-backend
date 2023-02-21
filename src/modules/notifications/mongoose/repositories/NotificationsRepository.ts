import { INotificationsRepository } from '@modules/notifications/mongoose/repositories/INotificationsRepository'
import { ICreateNotificationDTO } from '@modules/notifications/dtos/ICreateNotificationsDTO'

import { Notification, notificationSchema } from '../schemas/Notification'

export class NotificationsRepository implements INotificationsRepository {
  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification({
      recipient_id: recipient_id,
      content: content,
    })
    notification.save().then()

    return notification
  }
}
