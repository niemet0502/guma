import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Livrable } from 'src/livrables/entities/livrable.entity';

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

  @Field({ nullable: false })
  livrable_id: number;

  @Field({ nullable: false })
  created_at: string;

  @Field((type) => Livrable, { nullable: true })
  livrable: Livrable;
}
