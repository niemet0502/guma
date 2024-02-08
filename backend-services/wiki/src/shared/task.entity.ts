import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Document } from '../documents/entities/document.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Task {
  @Field((type) => ID)
  @Directive('@external')
  id: string;

  @Field((type) => [Document])
  documents: Document[];
}
