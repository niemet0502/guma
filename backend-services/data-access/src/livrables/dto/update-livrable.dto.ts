import { PartialType } from '@nestjs/swagger';
import { CreateLivrableDto } from './create-livrable.dto';

export class UpdateLivrableDto extends PartialType(CreateLivrableDto) {}
