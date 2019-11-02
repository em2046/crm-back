import { Controller, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { Crud } from '@nestjsx/crud';
import { Role } from './role.entity';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from '../permissions.decorator';

UseGuards(AuthGuard());
const useGuards = UseGuards(AuthGuard());
const create = Permissions('role_create');
const update = Permissions('role_update');
const remove = Permissions('role_delete');

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
@Controller('role')
export class RoleController {
  constructor(public service: RoleService) {}
}
