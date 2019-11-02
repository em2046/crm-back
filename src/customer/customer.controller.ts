import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { AuthGuard } from '@nestjs/passport';
import { Crud } from '@nestjsx/crud';
import { Customer } from './customer.entity';

const routesOption = {
  decorators: [UseGuards(AuthGuard())],
};

@Crud({
  model: {
    type: Customer,
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
@Controller('customer')
export class CustomerController {
  constructor(public service: CustomerService) {}

  @UseGuards(AuthGuard())
  @Delete(':uuid')
  remove(@Param('uuid') uuid) {
    return this.service.remove(uuid);
  }
}
