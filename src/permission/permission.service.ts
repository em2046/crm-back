import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { Repository } from 'typeorm';
import { PermissionCreateDto } from './dto/permission-create.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(createPermissionDto: PermissionCreateDto): Promise<Permission> {
    //region 查询是否已有此权限
    const foundPermissionName = await this.permissionRepository.findOne({
      name: createPermissionDto.name,
    });
    if (foundPermissionName) {
      throw new NotAcceptableException('权限名称已经存在');
    }
    //endregion

    return await this.permissionRepository.save(createPermissionDto);
  }

  async findAll(): Promise<Permission[]> {
    return await this.permissionRepository.find();
  }
}
