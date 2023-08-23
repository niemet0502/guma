import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateSprintDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ required: true })
  public name: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  public team_id: number;

  @ApiProperty({ required: false })
  public goal: string;

  @IsNotEmpty()
  @ApiProperty({ required: false })
  public start_at: Date;

  @IsNotEmpty()
  @ApiProperty({ required: false })
  public end_at: Date;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  public duration: number;
}
