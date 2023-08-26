import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ required: false })
  public content: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  public task_id: number;

  @ApiProperty({ required: false })
  created_by: number;
}
