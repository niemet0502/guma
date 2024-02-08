import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { TeamVisibility } from '../teams.enum';

export class CreateTeamDto {
  @ApiProperty({ required: true })
  public project_id: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ required: true })
  public name: string;

  @ApiProperty({ required: false })
  public icon: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ required: true })
  public identifier: string;

  @ApiProperty({ required: false })
  public visibility: TeamVisibility;
}
