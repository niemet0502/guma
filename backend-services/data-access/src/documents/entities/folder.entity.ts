import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Folder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  name: string;

  @Column({ nullable: false })
  team_id: number;
}
