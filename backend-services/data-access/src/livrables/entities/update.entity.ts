import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LivrableUpdate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, default: 1 })
  status: number;

  @Column('text', { nullable: true })
  description: string;

  @Column({ nullable: true })
  created_by?: number;

  @Column({ nullable: false })
  livrable_id: number;

  @Column('text', { nullable: false })
  created_at: string;
}
