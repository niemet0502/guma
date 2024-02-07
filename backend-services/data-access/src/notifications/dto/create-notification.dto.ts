import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  public reminder_id: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  public receiver_id: number;

  @ApiProperty({ required: false })
  public created_at: string;
}
