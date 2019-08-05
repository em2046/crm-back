import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { Repository } from 'typeorm';
import { PermissionCreateDto } from './dto/permission-create.dto';
import { PermissionCreateCode } from './enum/permission-create-code';
import { HttpResult } from '../dto/http-result';
import { PermissionFindAllCode } from './enum/permission-find-all-code';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(
    createPermissionDto: PermissionCreateDto,
  ): Promise<HttpResult<PermissionCreateCode, Permission>> {
    // 查询是否已有此权限
    const foundPermissionName = await this.permissionRepository.findOne({
      name: createPermissionDto.name,
    });
    if (foundPermissionName) {
      return {
        code: PermissionCreateCode.NAME_ALREADY_EXISTS,
        message: 'name already exists',
      };
    }

    const savedPermission = await this.permissionRepository.save(
      createPermissionDto,
    );

    return {
      code: PermissionCreateCode.SUCCESS,
      message: 'create permission success',
      data: savedPermission,
    };
  }

  async findAll(): Promise<HttpResult<PermissionFindAllCode, Permission[]>> {
    const permissions = await this.permissionRepository.find();
    return {
      code: PermissionFindAllCode.SUCCESS,
      message: 'find all permission success',
      data: permissions,
    };
  }
}
