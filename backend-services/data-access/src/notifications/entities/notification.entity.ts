import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  reminder_id: number;

  @Column('int')
  receiver_id: number;

  @Column()
  created_at: string;

  @Column('boolean', { default: false })
  read: boolean;

  @Column({ default: "Vous avez demandé qu'on vous rappelle cette tache" })
  content: string;
}
