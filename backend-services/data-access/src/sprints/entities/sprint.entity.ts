import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SprintStatusEnum } from '../sprint.enum';

@Entity()
export class Sprint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('boolean', { default: false })
  isCompleted: boolean;

  @Column({
    type: 'enum',
    enum: SprintStatusEnum,
    default: SprintStatusEnum.Pending,
  })
  status: SprintStatusEnum;

  @Column({ nullable: true })
  unCompletedTasksUponClose: number;

  @Column({ nullable: true })
  totalTasksUponClose: number;

  @Column('text', { nullable: true })
  duration: number;

  @Column('text', { nullable: false })
  start_at: string;

  @Column('text', { nullable: false })
  end_at: string;

  @Column('longtext', { nullable: true })
  goal: string;

  @Column({ nullable: false })
  team_id: number;
}
