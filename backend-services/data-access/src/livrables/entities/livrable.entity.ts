import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Livrable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('number', { default: 0 })
  status: number;

  @Column('text', { nullable: false })
  start_at: string;

  @Column('text', { nullable: false })
  end_at: string;

  @Column({ nullable: false })
  team_id: number;

  @Column({ nullable: true })
  created_by?: number;
}
