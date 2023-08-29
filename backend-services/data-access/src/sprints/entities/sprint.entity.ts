import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sprint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  duration: number;

  @Column('date', { nullable: false })
  start_at: Date;

  @Column('date', { nullable: false })
  end_at: Date;

  @Column('longtext', { nullable: true })
  goal: string;

  @Column({ nullable: false })
  team_id: number;
}
