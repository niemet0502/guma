import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ required: true })
  public name: string;

  @IsString()
  @ApiProperty({ required: false })
  public description: string;
}
