import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ActivityAction } from '../../tasks/tasks.enum';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  created_by: number;

  @Column({ nullable: false })
  task_id: number;

  @Column({
    nullable: true,
  })
  from_status: number;

  @Column({
    nullable: true,
  })
  to_status: number;

  @Column({
    nullable: true,
  })
  priority?: number;

  @Column({
    nullable: true,
  })
  assignee_to?: number;

  @Column({
    nullable: true,
  })
  sprint_id: number;

  @Column({
    type: 'enum',
    enum: ActivityAction,
  })
  action: ActivityAction;

  @Column('text', { nullable: false })
  created_at: string;

  @Column('text', { nullable: false })
  updated_at: string;
}
