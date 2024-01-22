import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';
import { Team } from '../../shared/team.entity';
import { User } from '../../shared/user.entity';
import { DocumentStatus } from '../documents.enum';

@ObjectType()
@Directive('@key(fields: "id")')
export class Document {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  folder_id?: number;

  @Field({ nullable: true })
  team_id?: number;

  @Field((type) => Team)
  team?: Team;

  @Field({ nullable: true })
  content?: string;

  @Field()
  status: DocumentStatus;

  @Field()
  created_by: number;

  @Field(() => User)
  author?: User;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;
}
