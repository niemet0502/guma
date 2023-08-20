import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  team_id: number;

  @Column({ nullable: false })
  user_id: number;

  @Column('date', { nullable: false })
  created_at: Date;
}
