import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { ProjectMember } from 'src/members/entities/member.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field((type) => ID)
  @Directive('@external')
  id: number;

  @Field((type) => [ProjectMember], { nullable: true })
  projects: ProjectMember[];
}
