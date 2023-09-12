import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskLabelDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  public task_id: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  public label_id: number;
}
