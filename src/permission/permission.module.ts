import { Body, Module, Post } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { PermissionCreateDto } from './dto/permission-create.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Permission]),
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  create(@Body() createPermissionDto: PermissionCreateDto) {
    return this.permissionService.create(createPermissionDto);
  }
}
