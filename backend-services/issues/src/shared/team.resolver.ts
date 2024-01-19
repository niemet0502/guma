import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { LivrablesService } from 'src/livrables/livrables.service';
import { Livrable } from '../livrables/entities/livrable.entity';
import { Team } from './team.entity';

@Resolver(() => Team)
export class TeamResolver {
  constructor(private readonly livrablesService: LivrablesService) {}

  @ResolveField(() => [Livrable])
  async livrables(@Parent() team: Team): Promise<Livrable[]> {
    return await this.livrablesService.findAll(+team.id);
  }
}
