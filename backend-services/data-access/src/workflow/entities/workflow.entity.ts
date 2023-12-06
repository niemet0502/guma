import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Workflow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  team_id: number;

  @Column({ nullable: false })
  status_id: number;

  @Column({ nullable: false })
  order_value: number;
}
