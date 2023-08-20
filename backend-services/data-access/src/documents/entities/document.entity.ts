import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DocumentStatus } from '../documents.enum';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  folder_id: number;

  @Column('int', { nullable: false })
  team_id: number;

  @Column('longtext', { nullable: true })
  content: string;

  @Column({
    type: 'enum',
    enum: DocumentStatus,
    default: DocumentStatus.DRAFT,
  })
  status: DocumentStatus;

  @Column()
  created_by: number;

  @Column('date', { nullable: false })
  created_at: Date;

  @Column('date', { nullable: false })
  updated_at: Date;
}
