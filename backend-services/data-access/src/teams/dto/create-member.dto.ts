import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMemberDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  public team_id: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  public user_id: number;
}
