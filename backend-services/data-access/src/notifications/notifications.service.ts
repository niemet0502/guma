import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private repository: Repository<Notification>,
  ) {}

  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    return await this.repository.save({
      ...createNotificationDto,
      created_at: new Date().toString(),
    });
  }

  async findAllByUser(user_id: number): Promise<Notification[]> {
    return await this.repository.find({
      where: { receiver_id: user_id },
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Notification> {
    const result = await this.repository.findOne({ where: { id } });
    const updated = await this.repository.save({ ...result, read: true });

    return updated;
  }

  async update(
    id: number,
    updateNotificationDto: UpdateNotificationDto,
  ): Promise<Notification> {
    const toUpdate = await this.repository.findOne({
      where: { id },
    });

    const updated = Object.assign(toUpdate, updateNotificationDto);

    return await this.repository.save({
      ...updated,
      updated_at: new Date().toString(),
    });
  }

  async remove(id: number): Promise<Notification> {
    const notification = await this.repository.findOne({ where: { id } });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return await this.repository.remove(notification);
  }
}
