import { ApiProperty } from '@nestjs/swagger';
import { CompleteSprintDestination } from '../sprint.enum';

export class CompleteSprintDto {
  @ApiProperty({ required: true })
  public isCompleted: boolean;

  @ApiProperty({ required: false })
  public destination?: CompleteSprintDestination;

  @ApiProperty({ required: false })
  public unCompletedTasksIds?: number[];
}
