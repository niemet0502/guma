import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('longtext', { nullable: true })
  content: string;

  @Column({ nullable: false })
  task_id: number;

  @Column({ nullable: false })
  created_by: number;

  @Column('text', { nullable: false })
  created_at: string;

  @Column('text', { nullable: false })
  updated_at: string;
}
