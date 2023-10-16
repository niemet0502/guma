import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../shared/user.entity';

@ObjectType()
export class Comment {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Field({ nullable: true })
  content: string;

  @Field({ nullable: true })
  task_id?: number;

  @Field({ nullable: true })
  parent_id?: number;

  @Field({ nullable: false })
  created_by: number;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;

  @Field(() => User)
  author?: User;

  @Field(() => [Comment])
  replies?: Comment[];
}
