import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({ required: true })
  public name: string;

  @IsString()
  @ApiProperty()
  public size: string;

  @IsString()
  @ApiProperty()
  public logo: string;
}
