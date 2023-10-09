import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TaskStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column({ nullable: true })
  team_id?: number;
}
