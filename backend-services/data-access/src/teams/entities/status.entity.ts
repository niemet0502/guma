import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TaskStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column()
  team_id: number;
}
