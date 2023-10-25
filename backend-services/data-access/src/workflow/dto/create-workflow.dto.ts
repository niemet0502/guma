import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateWorkflowDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  public team_id: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  public status_id: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  public order_value: number;
}
