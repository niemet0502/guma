import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Document } from '../../documents/entities/document.entity';

@ObjectType()
export class Folder {
  @Field(() => Int)
  id: number;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  team_id: number;

  @Field((type) => [Document])
  documents: Document[];
}
