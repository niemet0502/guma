import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProjectMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  project_id: number;

  @Column('int')
  user_id: number;

  @Column('int')
  profile_id: number;
}
