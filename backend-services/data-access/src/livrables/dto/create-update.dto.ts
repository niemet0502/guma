import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLivrableUpdateDto {
  @ApiProperty({ required: false })
  public status: number;

  @ApiProperty({ required: false })
  public description: string;

  @ApiProperty({ required: false })
  public create_at: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  public livrable_id: number;

  @ApiProperty({ required: false })
  public created_by: number;
}
