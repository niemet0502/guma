import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sprint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  duration: number;

  @Column('text', { nullable: false })
  start_at: string;

  @Column('text', { nullable: false })
  end_at: string;

  @Column('longtext', { nullable: true })
  goal: string;

  @Column({ nullable: false })
  team_id: number;
}
