import { Body, Controller, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleCreateDto } from './dto/role-create.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: RoleCreateDto) {
    return this.roleService.create(createRoleDto);
  }
}
