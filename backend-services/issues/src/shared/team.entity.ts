import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Livrable } from '../livrables/entities/livrable.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Team {
  @Field((type) => ID)
  @Directive('@external')
  id: string;

  @Field((type) => [Livrable])
  livrables: Livrable[];
}
