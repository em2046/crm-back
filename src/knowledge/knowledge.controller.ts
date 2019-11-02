import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { AuthGuard } from '@nestjs/passport';
import { Knowledge } from './knowledge.entity';
import { KnowledgeService } from './knowledge.service';
import { SearchDto } from './dto/search.dto';
import { Permissions } from '../permissions.decorator';

const useGuards = UseGuards(AuthGuard());
const create = Permissions('knowledge_create');
const update = Permissions('knowledge_update');
const remove = Permissions('knowledge_delete');

@Crud({
  model: {
    type: Knowledge,
  },
  params: {
    id: {
      field: 'uuid',
      type: 'uuid',
      primary: true,
    },
  },
  routes: {
    getManyBase: {
      decorators: [useGuards],
    },
    getOneBase: {
      decorators: [useGuards],
    },
    createOneBase: {
      decorators: [useGuards, create],
    },
    createManyBase: {
      decorators: [useGuards, create],
    },
    updateOneBase: {
      decorators: [useGuards, update],
    },
    replaceOneBase: {
      decorators: [useGuards, update],
    },
    deleteOneBase: {
      decorators: [useGuards, remove],
    },
  },
})
@Controller('knowledge')
export class KnowledgeController {
  constructor(public service: KnowledgeService) {}

  @UseGuards(AuthGuard())
  @Post('search')
  search(@Body() searchDto: SearchDto) {
    const keyword = searchDto.keyword;
    return this.service.search(keyword);
  }
}
