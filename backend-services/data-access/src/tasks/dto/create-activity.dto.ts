import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ActivityAction } from '../tasks.enum';

export class CreateActivityDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  public created_by: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  public task_id: number;

  @ApiProperty({ required: false })
  public from_status: number;

  @ApiProperty({ required: false })
  public to_status: number;

  @ApiProperty({ required: false })
  public sprint_id: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  public action: ActivityAction;
}
