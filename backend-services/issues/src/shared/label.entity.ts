import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Label {
  @Field((type) => ID)
  @Directive('@external')
  id: string;
}
