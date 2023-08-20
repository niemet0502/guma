import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column({ nullable: false })
  created_by: number;

  @Column('date', { nullable: false })
  created_at: Date;

  @Column('date', { nullable: false })
  updated_at: Date;
}
