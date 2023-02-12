import { AppDataSourceMongo } from '@shared/infra/typeorm/data-source'
import { Repository } from 'typeorm'

import INotificationsRepository from '@modules/notifications/repositories/interface/INotificationsRepository'
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationsDTO'

import Notification from '../schemas/Notification'

class NotificationsRepository implements INotificationsRepository {
  private notificationRepository: Repository<Notification>

  constructor() {
    this.notificationRepository = AppDataSourceMongo.getRepository(Notification)
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.notificationRepository.create({
      content,
      recipient_id,
    })
    await this.notificationRepository.save(notification)
    return notification
  }
}

export default NotificationsRepository
