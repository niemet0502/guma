import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
