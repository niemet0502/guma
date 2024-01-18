import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateLivrableupdateInput } from './dto/create-livrableupdate.input';
import { UpdateLivrableupdateInput } from './dto/update-livrableupdate.input';
import { Livrableupdate } from './entities/livrableupdate.entity';
import { LivrableupdatesService } from './livrableupdates.service';

@Resolver(() => Livrableupdate)
export class LivrableupdatesResolver {
  constructor(
    private readonly livrableupdatesService: LivrableupdatesService,
  ) {}

  @Mutation(() => Livrableupdate)
  createLivrableupdate(
    @Args('createLivrableupdateInput')
    createLivrableupdateInput: CreateLivrableupdateInput,
  ) {
    return this.livrableupdatesService.create(createLivrableupdateInput);
  }

  @Query(() => [Livrableupdate], { name: 'livrableupdates' })
  findAll(@Args('livrable_id', { type: () => Int }) livrable_id: number) {
    return this.livrableupdatesService.findAll(livrable_id);
  }

  @Query(() => Livrableupdate, { name: 'livrableupdate' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.livrableupdatesService.findOne(id);
  }

  @Mutation(() => Livrableupdate)
  updateLivrableupdate(
    @Args('updateLivrableupdateInput')
    updateLivrableupdateInput: UpdateLivrableupdateInput,
  ) {
    return this.livrableupdatesService.update(
      updateLivrableupdateInput.id,
      updateLivrableupdateInput,
    );
  }

  @Mutation(() => Livrableupdate)
  removeLivrableupdate(@Args('id', { type: () => Int }) id: number) {
    return this.livrableupdatesService.remove(id);
  }

  @ResolveField()
  livrable(@Parent() update: Livrableupdate) {
    const { livrable_id } = update;
    return this.livrableupdatesService.getLivrable(livrable_id);
  }
}
