import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateReminderReceiversDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  public reminder_id: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  public user_id: number;
}
