import { ForbiddenException, Injectable } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import Origin from '../utils/origin';
import Utils from '../utils/utils';
import { Role } from '../role/role.entity';
import { UserService } from '../user/user.service';
import { UserCreateDto } from '../user/dto/user-create.dto';
import { Permission } from '../permission/permission.entity';
import { PERMISSION } from '../permission/permission';
import { SURNAME } from './surname';
import { Customer, CustomerEducation, CustomerGender, CustomerLevel, CustomerMaritalStatus, CustomerType } from '../customer/customer.entity';
import { CITIES } from './cities';

@Injectable()
export class InstallService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
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
    await this.installCustomer();

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
   * 安装权限
   */
  private async installPermission() {
    const permissions = [];
    Object.values(PERMISSION).forEach(p => {
      permissions.push(...Object.values(p));
    });

    await this.permissionRepository.save(permissions);
  }

  /**
   * 安装角色
   */
  private async installRole() {
    const roles = [
      {
        name: 'admin',
        title: '管理员',
        permissions: [PERMISSION.USER.CREATE, PERMISSION.USER.UPDATE],
      },
      {
        name: 'operator',
        title: '运营',
        permissions: [PERMISSION.TASK.CREATE],
      },
      {
        name: 'supervisor',
        title: '客服主管',
        permissions: [PERMISSION.TASK.ASSIGN],
      },
      { name: 'staff', title: '客服', permissions: [PERMISSION.TASK.EXECUTE] },
    ];
    await this.roleRepository.save(roles);
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
   * 安装会员
   */
  private async installCustomer() {
    for (let i = 0; i < 100; i++) {
      const customer = new Customer();
      customer.realName = InstallService.randomName();
      customer.nickName = InstallService.randomName();
      const id = i.toString().padStart(7, '0');
      customer.name = 'lv' + id;

      customer.type = InstallService.randomArrayItem([
        CustomerType.NORMAL,
        CustomerType.VIP,
      ]);

      customer.level = InstallService.randomArrayItem([
        CustomerLevel.LEVEL_0,
        CustomerLevel.LEVEL_1,
        CustomerLevel.LEVEL_2,
        CustomerLevel.LEVEL_3,
        CustomerLevel.LEVEL_4,
        CustomerLevel.LEVEL_5,
        CustomerLevel.LEVEL_6,
      ]);

      const now = new Date();
      const pass = new Date();
      pass.setFullYear(now.getFullYear() - 100);

      customer.registrationTime = new Date(
        InstallService.randomIntervalInt(pass.getTime(), now.getTime()),
      ).toISOString();

      customer.gender = InstallService.randomArrayItem([
        CustomerGender.UN_KNOW,
        CustomerGender.MALE,
        CustomerGender.FEMALE,
        CustomerGender.OTHER,
      ]);

      customer.birthday = new Date(
        InstallService.randomIntervalInt(pass.getTime(), now.getTime()),
      ).toISOString();

      customer.city = InstallService.randomArrayItem(CITIES).code;

      customer.annualIncome = InstallService.randomIntervalInt(
        1_000,
        1_000_000,
      );

      customer.education = InstallService.randomArrayItem([
        CustomerEducation.UN_KNOW,
        CustomerEducation.ASSOCIATE,
        CustomerEducation.BACHELOR,
        CustomerEducation.MASTER,
        CustomerEducation.DOCTOR,
        CustomerEducation.OTHER,
      ]);

      customer.maritalStatus = InstallService.randomArrayItem([
        CustomerMaritalStatus.UN_KNOW,
        CustomerMaritalStatus.MARRIED,
        CustomerMaritalStatus.UNMARRIED,
        CustomerMaritalStatus.OTHER,
      ]);

      customer.numberOfChildren = InstallService.randomIntervalInt(0, 3);

      customer.phoneNumber = InstallService.randomIntervalInt(
        10000000000,
        20000000000,
      ).toString();

      customer.weChat =
        'wc' +
        InstallService.randomIntervalInt(0, 100000)
          .toString()
          .padStart(5, '0');

      const qq = InstallService.randomIntervalInt(10000, 1000000000).toString();

      customer.qq = qq;

      customer.email = `${qq}@em2046.com`;

      await this.customerRepository.save(customer);
    }
  }

  static randomName() {
    const index = Math.floor(Math.random() * SURNAME.length);
    const surname = SURNAME[index];

    const time = Math.floor(Math.random() * 3) + 1;

    const givenName = [];
    for (let i = 0; i < time; i++) {
      givenName.push(InstallService.randomCJK());
    }

    return surname + givenName.join('');
  }

  static randomArrayItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  static randomInterval(low, high) {
    const len = high - low;
    return Math.random() * len + low;
  }

  static randomIntervalInt(low, high) {
    return Math.floor(InstallService.randomInterval(low, high));
  }

  private static randomCJK() {
    const low = 0x4e00;
    const high = 0x9fa5;
    const len = high - low;

    return String.fromCodePoint(Math.floor(Math.random() * len + low));
  }
}
