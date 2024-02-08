import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Livrable } from '../../livrables/entities/livrable.entity';
import { User } from '../../shared/user.entity';

@ObjectType()
export class Livrableupdate {
  @Field(() => ID)
  id: number;

  @Field(() => Int)
  status: number;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  created_by?: number;

  @Field((type) => User, { nullable: true })
  author?: User;

  @Field({ nullable: false })
  livrable_id: number;

  @Field({ nullable: false })
  created_at: string;

  @Field((type) => Livrable, { nullable: true })
  livrable: Livrable;
}
