import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CustomerService } from '../customer/customer.service';
import { AuthGuard } from '@nestjs/passport';
import { Crud } from '@nestjsx/crud';
import { Label } from './label.entity';
import { LabelService } from './label.service';

const routesOption = {
  decorators: [UseGuards(AuthGuard())],
};

@Crud({
  model: {
    type: Label,
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
@Controller('label')
export class LabelController {
  constructor(
    public service: LabelService,
    public customerService: CustomerService,
  ) {}

  @Post('query')
  async query(@Body() queryDto) {
    return await this.customerService.query(queryDto);
  }
}
