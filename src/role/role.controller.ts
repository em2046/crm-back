import { Controller, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { Crud } from '@nestjsx/crud';
import { Role } from './role.entity';
import { AuthGuard } from '@nestjs/passport';

const routesOption = {
  decorators: [UseGuards(AuthGuard())],
};

@Crud({
  model: {
    type: Role,
  },
  params: {
    id: {
      field: 'uuid',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    join: {
      permissions: {},
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
@Controller('role')
export class RoleController {
  constructor(public service: RoleService) {}
}
