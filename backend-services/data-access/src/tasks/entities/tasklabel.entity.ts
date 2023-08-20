import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TaskLabel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  task_id: number;

  @Column({ nullable: false })
  label_id: number;
}
