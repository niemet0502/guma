import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TeamVisibility } from '../teams.enum';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  project_id: number;

  @Column('text', { nullable: false })
  name: string;

  @Column('text', { nullable: false })
  icon: string;

  @Column('text')
  identifier: string;

  @Column({
    type: 'enum',
    enum: TeamVisibility,
    default: TeamVisibility.PUBLIC,
  })
  visibility: TeamVisibility;
}
