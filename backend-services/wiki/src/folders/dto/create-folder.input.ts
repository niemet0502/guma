import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateFolderInput {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  team_id: number;

  @Field({ nullable: true })
  created_by?: number;
}
