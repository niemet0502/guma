import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateFolderDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ required: true })
  public name: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  public team_id: number;

  public create_by: number;
}
