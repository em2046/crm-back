import { ForbiddenException, Injectable } from '@nestjs/common';
import { Repository, getConnection } from 'typeorm';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import Origin from '../utils/origin';
import Utils from '../utils/utils';
import { Role } from '../role/role.entity';
import { UserService } from '../user/user.service';
import { UserCreateDto } from '../user/dto/user-create.dto';
import { Permission } from '../permission/permission.entity';

@Injectable()
export class InstallService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    private readonly userService: UserService,
  ) {}

  /**
   * 安装全部
   * @param validateInfo
   */
  async installAll(validateInfo) {
    const username = validateInfo.username;
    if (username !== 'em2046') {
      throw new ForbiddenException();
    }
    const password = await Utils.pbkdf2Promise(
      validateInfo.password,
      Origin.salt,
    );
    if (password !== Origin.password) {
      throw new ForbiddenException();
    }

    await InstallService.clearUpData();
    await this.installPermission();
    await this.installRole();
    await this.installUserAdmin();
    await this.installUsers();

    return {
      code: 0,
      message: '数据初始化成功',
    };
  }

  /**
   * 清空数据
   */
  static async clearUpData() {
    const connection = getConnection();

    await connection.dropDatabase();
    await connection.synchronize();
  }

  /**
   * 安装管理员
   */
  private async installUserAdmin() {
    const roleAdmin = await this.roleRepository.findOne({ name: 'admin' });
    const userAdmin = new User();
    userAdmin.email = 'admin@em2046.com';
    userAdmin.name = 'admin';
    userAdmin.realName = '管理员';
    userAdmin.password = Origin.password;
    userAdmin.salt = Origin.salt;
    userAdmin.roles = [roleAdmin];
    userAdmin.avatar = '129464';

    await this.userRepository.save(userAdmin);
  }

  /**
   * 安装角色
   */
  private async installRole() {
    const permissionsManagement = await this.permissionRepository.findOne({
      name: 'management',
    });
    const permissionsLogin = await this.permissionRepository.findOne({
      name: 'login',
    });
    const roles = [
      {
        name: 'admin',
        title: '管理员',
        permissions: [permissionsLogin, permissionsManagement],
      },
      { name: 'operator', title: '运营', permissions: [permissionsLogin] },
      {
        name: 'supervisor',
        title: '客服主管',
        permissions: [permissionsLogin],
      },
      { name: 'staff', title: '客服', permissions: [permissionsLogin] },
    ];
    await this.roleRepository.save(roles);
  }

  /**
   * 安装用户
   */
  private async installUsers() {
    const roleStaff = await this.roleRepository.findOne({ name: 'staff' });
    const roleSupervisor = await this.roleRepository.findOne({
      name: 'supervisor',
    });
    const roleOperator = await this.roleRepository.findOne({
      name: 'operator',
    });

    const userTest = {
      name: 'test',
      password: 'test',
      email: 'test@em2046.com',
      realName: '测试',
      avatar: '128027',
    } as UserCreateDto;
    await this.userService.create(userTest);

    const userStaff = {
      name: 'staff',
      password: 'staff',
      email: 'staff@em2046.com',
      realName: '客服',
      avatar: '128029',
    } as UserCreateDto;
    const createdUserStaff = await this.userService.create(userStaff);
    createdUserStaff.roles = [roleStaff];
    await this.userRepository.save(createdUserStaff);

    const userSupervisor = {
      name: 'supervisor',
      password: 'supervisor',
      email: 'supervisor@em2046.com',
      realName: '客服主管',
      avatar: '128039',
    } as UserCreateDto;
    const createdUserSupervisor = await this.userService.create(userSupervisor);
    createdUserSupervisor.roles = [roleSupervisor];
    await this.userRepository.save(createdUserSupervisor);

    const userOperator = {
      name: 'operator',
      password: 'operator',
      email: 'operator@em2046.com',
      realName: '运营',
      avatar: '128032',
    } as UserCreateDto;
    const createdUserOperator = await this.userService.create(userOperator);
    createdUserOperator.roles = [roleOperator];
    await this.userRepository.save(createdUserOperator);
  }

  /**
   * 安装权限
   */
  private async installPermission() {
    const permissions = [
      { name: 'management', title: '管理' },
      { name: 'taskQuery', title: '任务查询' },
      { name: 'taskCreate', title: '任务创建' },
      { name: 'taskAssign', title: '任务指派' },
      { name: 'taskExecute', title: '任务执行' },
      { name: 'knowledgeQuery', title: '知识查询' },
      { name: 'knowledgeManage', title: '知识管理' },
      { name: 'customerQuery', title: '客户查询' },
      { name: 'customerManage', title: '客户管理' },
    ];
    await this.permissionRepository.save(permissions);
  }
}
