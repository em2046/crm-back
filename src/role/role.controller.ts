import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleCreateDto } from './dto/role-create.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(AuthGuard())
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @UseGuards(AuthGuard())
  @Post()
  create(@Body() createRoleDto: RoleCreateDto) {
    return this.roleService.create(createRoleDto);
  }
}
