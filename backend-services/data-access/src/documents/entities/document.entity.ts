import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DocumentStatus } from '../documents.enum';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('number', { nullable: false })
  folder_id: number;

  @Column('number', { nullable: false })
  team_id: number;

  @Column('longtext', { nullable: true })
  content: string;

  @Column({
    type: 'enum',
    enum: DocumentStatus,
    default: DocumentStatus.DRAFT,
  })
  status: DocumentStatus;

  @Column('number')
  created_by: number;
}
