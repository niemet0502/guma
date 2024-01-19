import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  content: string;

  @Column('int')
  question_id: number;

  @Column('text')
  created_at: string;

  @Column('int')
  created_by: number;

  @Column('text')
  updated_at: string;
}
