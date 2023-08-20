import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  user_id: number;

  @Column('text', { nullable: false })
  token: string;

  @Column('date', { nullable: false })
  created_at: Date;

  @Column('date', { nullable: false })
  expired_at: Date;
}
