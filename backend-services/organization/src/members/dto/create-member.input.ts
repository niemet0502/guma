import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateMemberProjectInput {
  @Field(() => Int, {
    description: 'The project in which you are assigning a user',
  })
  project_id: number;

  @Field(() => Int, { description: 'The user you are assigning' })
  user_id: number;

  @Field(() => Int, { description: "The user's profile within that project" })
  profile_id: number;
}
