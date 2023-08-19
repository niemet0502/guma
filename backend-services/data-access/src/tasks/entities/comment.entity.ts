import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('longtext', { nullable: true })
  content: string;

  @Column('number', { nullable: false })
  task_id: string;

  @Column('number', { nullable: false })
  created_by: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
