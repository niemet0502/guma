import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  user_id: number;

  @Column('text', { nullable: false })
  token: string;

  @Column('text', { nullable: false })
  created_at: string;

  @Column('text', { nullable: false })
  expired_at: string;
}
