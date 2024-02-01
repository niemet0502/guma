import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reminder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text', { nullable: false })
  message: string;

  @Column('int', { nullable: false })
  task_id: number;

  @Column('text')
  send_at: string;

  @Column('int')
  created_by: number;

  @Column('text')
  created_at: string;

  @Column('int', { nullable: true })
  type: number;
}
