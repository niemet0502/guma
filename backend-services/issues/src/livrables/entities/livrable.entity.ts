import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../shared/user.entity';

@ObjectType()
export class Livrable {
  @Field(() => Int, { description: 'Example field (placeholder)' })
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
