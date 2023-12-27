import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Label } from '../../labels/entities/label.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class Organization {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  size: string;

  @Field({ nullable: true })
  logo?: string;

  @Field((type) => [Label])
  labels?: Label[];
}
