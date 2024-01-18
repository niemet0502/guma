import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateVoteDto {
  @ApiProperty({ required: true })
  public created_by: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  public answer_id: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  isvalidated: boolean;
}
