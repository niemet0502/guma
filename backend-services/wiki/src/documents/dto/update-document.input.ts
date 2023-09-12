import { CreateDocumentInput } from './create-document.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDocumentInput extends PartialType(CreateDocumentInput) {
  @Field(() => Int)
  id: number;
}
