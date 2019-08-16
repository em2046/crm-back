import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionCreateDto } from './dto/permission-create.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @UseGuards(AuthGuard())
  @Get()
  findAll() {
    return this.permissionService.findAll();
  }

  @UseGuards(AuthGuard())
  @Post()
  create(@Body() createPermissionDto: PermissionCreateDto) {
    return this.permissionService.create(createPermissionDto);
  }
}
