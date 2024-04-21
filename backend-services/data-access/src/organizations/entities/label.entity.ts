import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Label {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column({ nullable: true })
  project_id: number;

  @Column({ nullable: true })
  team_id: number;
}
