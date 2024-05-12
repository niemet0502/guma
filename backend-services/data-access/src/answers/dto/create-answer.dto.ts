import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(30)
  @ApiProperty({ required: true })
  public content: string;

  @ApiProperty({ required: false })
  public created_by: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  public question_id: number;
}
