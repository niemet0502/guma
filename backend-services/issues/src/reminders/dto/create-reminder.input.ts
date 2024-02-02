import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateReminderInput {
  @Field({ nullable: false })
  public title: string;

  @Field({ nullable: true })
  public message: string;

  @Field({ nullable: false })
  public task_id: number;

  @Field({ nullable: false })
  public send_at: Date;

  @Field({ nullable: true })
  public created_by: number;

  @Field({ nullable: true })
  public created_at: Date;
}
