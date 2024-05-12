import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateLivrableDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ required: true })
  public name: string;

  @ApiProperty({ required: false })
  public description: string;

  @ApiProperty({ required: false })
  public status: number;

  @IsNotEmpty()
  @ApiProperty({ required: false })
  public start_at: Date;

  @IsNotEmpty()
  @ApiProperty({ required: false })
  public end_at: Date;

  @ApiProperty({ required: false })
  public team_id: number;

  @ApiProperty({ required: false })
  public created_by: number;
}
