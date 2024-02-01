import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TaskStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('int')
  state: number;

  @Column({ nullable: true })
  team_id?: number;
}
