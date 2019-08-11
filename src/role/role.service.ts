import { Injectable, NotAcceptableException } from '@nestjs/common';
import { RoleCreateDto } from './dto/role-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: RoleCreateDto): Promise<Role> {
    //region 查询是否已有此角色
    const foundRoleName = await this.roleRepository.findOne({
      name: createRoleDto.name,
    });
    if (foundRoleName) {
      throw new NotAcceptableException('角色名称已经存在');
    }
    //endregion

    return await this.roleRepository.save(createRoleDto);
  }

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async findSome(uuidList: string[]): Promise<Role[]> {
    return await this.roleRepository.findByIds(uuidList);
  }
}
