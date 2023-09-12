import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DocumentStatus } from '../documents.enum';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  folder_id: number;

  @Column('int', { nullable: true })
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

  @Column('text', { nullable: false })
  created_at: string;

  @Column('text', { nullable: false })
  updated_at: string;
}
