import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ required: false })
  public content: string;

  @ApiProperty({ required: false })
  public task_id: number;

  @ApiProperty({ required: false })
  created_by: number;

  @ApiProperty({ required: false })
  parent_id: number;
}
