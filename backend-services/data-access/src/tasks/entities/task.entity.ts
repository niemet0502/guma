import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskType } from '../tasks.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  slug: string;

  @Column('text', { nullable: false })
  name: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('text', { nullable: true })
  identifier: string;

  @Column({
    type: 'enum',
    enum: TaskType,
    default: TaskType.ISSUE,
  })
  type: TaskType;

  @Column({ nullable: true, default: 0 })
  priority: number;

  @Column('text', { nullable: true })
  created_at: string;

  @Column({ nullable: false })
  created_by: number;

  @Column({ nullable: false })
  assignee_to: number;

  @Column({ nullable: true })
  parent_task_id: number;

  @Column({ nullable: true })
  sprint_id: number;

  @Column({ nullable: false })
  status_id: number;

  @Column({ nullable: false })
  team_id: number;
}
