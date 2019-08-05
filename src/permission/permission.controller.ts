import { Body, Controller, Post } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionCreateDto } from './dto/permission-create.dto';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  create(@Body() createPermissionDto: PermissionCreateDto) {
    return this.permissionService.create(createPermissionDto);
  }
}
