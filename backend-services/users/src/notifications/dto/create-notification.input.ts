import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateNotificationInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;
}
