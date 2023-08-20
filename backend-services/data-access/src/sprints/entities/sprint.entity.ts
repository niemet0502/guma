import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sprint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  duration: string;

  @Column('date')
  start_at: Date;

  @Column('date')
  end_at: Date;

  @Column('longtext')
  goal: string;

  @Column()
  team_id: number;
}
