import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Workflow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('number', { nullable: false })
  team_id: number;

  @Column('number', { nullable: false })
  status_id: number;

  @Column('number', { nullable: false })
  order_value: number;
}
