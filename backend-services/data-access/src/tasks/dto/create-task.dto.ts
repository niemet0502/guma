import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { TaskType } from '../tasks.enum';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ required: true })
  public name: string;

  @ApiProperty({ required: false })
  public description: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ required: true })
  public slug: string;

  @ApiProperty({ required: false })
  public priority: number;

  @ApiProperty({ required: false })
  public parent_task_id: number;

  @ApiProperty({ required: false })
  public status_id: number;

  @IsNotEmpty()
  @ApiProperty({ required: false })
  public team_id: number;

  @IsNotEmpty()
  @ApiProperty({ required: false })
  public created_by: number;

  @ApiProperty({ required: false })
  public type: TaskType;
}
