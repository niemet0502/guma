import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Label } from 'src/labels/entities/label.entity';

@ObjectType()
export class Organization {
  @Field(() => Int)
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
