import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Comment {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Field({ nullable: true })
  content: string;

  @Field({ nullable: false })
  task_id: number;

  @Field({ nullable: false })
  created_by: number;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;
}
