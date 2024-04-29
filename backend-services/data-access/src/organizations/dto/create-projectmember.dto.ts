import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProjectMemberDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  project_id: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  user_id: number;
}
