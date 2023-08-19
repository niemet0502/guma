import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('number', { nullable: false })
  team_id: number;

  @Column('number', { nullable: false })
  user_id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
