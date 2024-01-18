import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../shared/user.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class Livrable {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: false })
  end_at: string;

  @Field({ nullable: false })
  start_at: string;

  @Field({ nullable: true })
  status: number;

  @Field({ nullable: false })
  team_id: number;

  @Field({ nullable: true })
  created_by?: number;

  @Field(() => User)
  author?: User;
}
