import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AnswerVote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  created_by: number;

  @Column('int')
  answer_id: number;

  @Column('boolean')
  isvalidated: boolean;
}
