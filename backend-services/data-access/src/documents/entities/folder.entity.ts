import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Folder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  name: string;

  @Column('number', { nullable: false })
  team_id: number;
}
