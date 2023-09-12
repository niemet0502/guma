import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  team_id: number;

  @Column({ nullable: false })
  user_id: number;

  @Column('text', { nullable: false })
  created_at: string;
}
