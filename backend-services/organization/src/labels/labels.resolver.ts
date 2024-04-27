import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql';
import { CreateLabelInput } from './dto/create-label.input';
import { UpdateLabelInput } from './dto/update-label.input';
import { Label } from './entities/label.entity';
import { LabelsService } from './labels.service';

@Resolver(() => Label)
export class LabelsResolver {
  constructor(private readonly labelsService: LabelsService) {}

  @Mutation(() => Label)
  createLabel(@Args('createLabelInput') createLabelInput: CreateLabelInput) {
    return this.labelsService.create(createLabelInput);
  }

  @Query(() => [Label], { name: 'labels' })
  findAll(
    @Args('project_id', { type: () => Int, nullable: true }) project_id: number,
    @Args('team_id', { type: () => Int, nullable: true }) team_id: number,
  ) {
    return this.labelsService.findAll(project_id, team_id);
  }

  @Query(() => Label, { name: 'label' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.labelsService.findOne(id);
  }

  @Mutation(() => Label)
  updateLabel(@Args('updateLabelInput') updateLabelInput: UpdateLabelInput) {
    return this.labelsService.update(updateLabelInput.id, updateLabelInput);
  }

  @Mutation(() => Label)
  removeLabel(@Args('id', { type: () => Int }) id: number) {
    return this.labelsService.remove(id);
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: number;
  }): Promise<Label> {
    return this.labelsService.findOne(reference.id);
  }
}
