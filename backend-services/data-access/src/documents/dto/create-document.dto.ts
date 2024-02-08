import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { DocumentStatus } from '../documents.enum';
export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ required: true })
  public name: string;

  @ApiProperty({ required: false })
  public status: DocumentStatus;

  @ApiProperty({ required: false })
  public folder_id: number;

  @ApiProperty({ required: false })
  public task_id: number;

  @ApiProperty({ required: false })
  public livrable_id: number;

  @ApiProperty({ required: false })
  public team_id: number;

  @IsNotEmpty()
  @ApiProperty({ required: false })
  public created_by: number;
}
