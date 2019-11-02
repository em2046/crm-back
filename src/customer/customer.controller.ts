import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { AuthGuard } from '@nestjs/passport';
import { Crud } from '@nestjsx/crud';
import { Customer } from './customer.entity';
import { Permissions } from '../permissions.decorator';

const useGuards = UseGuards(AuthGuard());
const create = Permissions('customer_create');
const update = Permissions('customer_update');
const remove = Permissions('customer_delete');

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
@Controller('customer')
export class CustomerController {
  constructor(public service: CustomerService) {}

  @useGuards
  @Permissions('customer_delete')
  @Delete(':uuid')
  remove(@Param('uuid') uuid) {
    return this.service.remove(uuid);
  }
}
