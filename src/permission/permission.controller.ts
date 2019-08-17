import { Controller, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Crud } from '@nestjsx/crud';
import { Permission } from './permission.entity';
import { AuthGuard } from '@nestjs/passport';

const routesOption = {
  decorators: [UseGuards(AuthGuard())],
};

@Crud({
  model: {
    type: Permission,
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
@Controller('permission')
export class PermissionController {
  constructor(public service: PermissionService) {}
}
