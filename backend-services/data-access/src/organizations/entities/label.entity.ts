import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Label {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column()
  organization_id: number;
}
