import { ICreateNotificationDTO } from '../../dtos/ICreateNotificationsDTO'
import { notificationSchema, Notification } from '../schemas/Notification'

export interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<typeof Notification>
}
