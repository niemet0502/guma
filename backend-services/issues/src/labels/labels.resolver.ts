import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LabelsService } from './labels.service';
import { Label } from './entities/label.entity';
import { CreateLabelInput } from './dto/create-label.input';
import { UpdateLabelInput } from './dto/update-label.input';

@Resolver(() => Label)
export class LabelsResolver {
  constructor(private readonly labelsService: LabelsService) {}

  @Mutation(() => Label)
  createLabel(@Args('createLabelInput') createLabelInput: CreateLabelInput) {
    return this.labelsService.create(createLabelInput);
  }

  @Query(() => [Label], { name: 'labels' })
  findAll() {
    return this.labelsService.findAll();
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
}
