import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateReminderDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  public title: string;

  @ApiProperty({ required: false })
  public message: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  public task_id: number;

  @ApiProperty({ required: false })
  public status_id: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  public send_at: Date;

  @ApiProperty({ required: false })
  public created_by: number;

  @ApiProperty({ required: false })
  public created_at: Date;
}
