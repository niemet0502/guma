import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ReminderReceiversIds {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  user_id: number;

  @Column('int')
  reminder_id: number;
}
