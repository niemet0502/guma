import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { ActivityAction } from '../tasks.enum';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({ required: false })
  action: ActivityAction;

  @ApiProperty({ required: false })
  sprint_id?: number;

  @ApiProperty({ required: false })
  livrable_id?: number;

  @ApiProperty({ required: false })
  assignee_to?: number;
}
