import { PartialType } from '@nestjs/swagger';
import { CreateLivrableUpdateDto } from './create-update.dto';

export class UpdateLivrableUpdateDto extends PartialType(
  CreateLivrableUpdateDto,
) {}
