import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({ required: true })
  public title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(30)
  @ApiProperty({ required: true })
  public content: string;

  @ApiProperty({ required: true })
  public created_by: number;
}
