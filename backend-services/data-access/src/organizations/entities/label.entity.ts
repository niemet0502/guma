import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Label {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('number')
  organization_id: number;
}
