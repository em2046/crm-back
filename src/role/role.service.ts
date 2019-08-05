import { Injectable } from '@nestjs/common';
import { RoleCreateDto } from './dto/role-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { HttpResult } from '../dto/http-result';
import { RoleCreateCode } from './enum/role-create-code';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(
    createRoleDto: RoleCreateDto,
  ): Promise<HttpResult<RoleCreateCode, Role>> {
    // 查询是否已有此角色
    const foundRoleName = await this.roleRepository.findOne({
      name: createRoleDto.name,
    });
    if (foundRoleName) {
      return {
        code: RoleCreateCode.NAME_ALREADY_EXISTS,
        message: 'name already exists',
      };
    }

    const savedRole = await this.roleRepository.save(createRoleDto);
    return {
      code: RoleCreateCode.SUCCESS,
      message: 'create role success',
      data: savedRole,
    };
  }
}
