import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: false })
  lastname: string;

  @ApiProperty({ required: false })
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ required: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ required: true })
  password: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  organization_id: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  profile_id: number;
}
