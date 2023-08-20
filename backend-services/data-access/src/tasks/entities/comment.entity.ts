import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('longtext', { nullable: true })
  content: string;

  @Column({ nullable: false })
  task_id: string;

  @Column({ nullable: false })
  created_by: string;

  @Column('date', { nullable: false })
  created_at: Date;

  @Column('date', { nullable: false })
  updated_at: Date;
}
