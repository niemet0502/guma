import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text', { nullable: false })
  content: string;

  @Column('text')
  created_at: string;

  @Column('int')
  created_by: number;

  @Column('text')
  updated_at: string;
}
