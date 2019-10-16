import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { AuthGuard } from '@nestjs/passport';
import { Knowledge } from './knowledge.entity';
import { KnowledgeService } from './knowledge.service';
import { SearchDto } from './dto/search.dto';

const routesOption = {
  decorators: [UseGuards(AuthGuard())],
};

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
    getManyBase: routesOption,
    getOneBase: routesOption,
    createOneBase: routesOption,
    createManyBase: routesOption,
    updateOneBase: routesOption,
    replaceOneBase: routesOption,
    deleteOneBase: routesOption,
  },
})
@Controller('knowledge')
export class KnowledgeController {
  constructor(public service: KnowledgeService) {}

  @Post('search')
  search(@Body() searchDto: SearchDto) {
    const keyword = searchDto.keyword;
    return this.service.search(keyword);
  }
}
