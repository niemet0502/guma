import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Label } from '../../labels/entities/label.entity';
import { ProjectMember } from '../../members/entities/member.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class Project {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  size: string;

  @Field({ nullable: true })
  logo?: string;

  @Field((type) => [Label])
  labels?: Label[];

  @Field((type) => [ProjectMember])
  members?: ProjectMember[];
}
