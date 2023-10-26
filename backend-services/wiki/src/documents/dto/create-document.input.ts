import { Field, InputType } from '@nestjs/graphql';
import { DocumentStatus } from '../documents.enum';

@InputType()
export class CreateDocumentInput {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: true })
  folder_id: number;

  @Field({ nullable: true })
  team_id: number;

  @Field({ nullable: true })
  created_by?: number;

  @Field({ nullable: true })
  content: string;

  @Field({ nullable: true })
  status: DocumentStatus;
}
