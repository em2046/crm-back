import * as fs from 'fs';
import * as path from 'path';
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
import {
  Customer,
  CustomerEducation,
  CustomerGender,
  CustomerLevel,
  CustomerMaritalStatus,
  CustomerType,
} from '../customer/customer.entity';
import { CITIES } from './cities';
import { Knowledge } from '../knowledge/knowledge.entity';
import postList from './post-list';
import { Complaint } from '../task/complaint/complaint.entity';
import complaintList from './complaint-list';

const fsPromises = fs.promises;

const fileOption = {
  encoding: 'utf8',
};

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
    @InjectRepository(Knowledge)
    private readonly knowledgeRepository: Repository<Knowledge>,
    @InjectRepository(Complaint)
    private readonly complaintRepository: Repository<Complaint>,
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
    await this.installKnowledge();
    await this.installComplaint();

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
   * 安装客户
   */
  private async installCustomer() {
    for (let i = 0; i < 100; i++) {
      const customer = new Customer();

      const gender = InstallService.randomArrayItem([
        CustomerGender.UN_KNOW,
        CustomerGender.MALE,
        CustomerGender.FEMALE,
        CustomerGender.OTHER,
      ]);

      const now = new Date();
      const pass = new Date();
      pass.setFullYear(now.getFullYear() - 100);
      const birthday = new Date(Utils.randomInt(pass.getTime(), now.getTime()));

      customer.realName = InstallService.randomRealName(gender);
      customer.nickName = InstallService.randomNickName();
      const id = i.toString().padStart(7, '0');
      customer.name = 'lv' + id;

      customer.type = InstallService.randomArrayItem([
        CustomerType.NORMAL,
        CustomerType.VIP,
      ]);

      customer.level = InstallService.randomArrayItem([
        CustomerLevel.LEVEL_1,
        CustomerLevel.LEVEL_2,
        CustomerLevel.LEVEL_3,
        CustomerLevel.LEVEL_4,
        CustomerLevel.LEVEL_5,
        CustomerLevel.LEVEL_6,
      ]);

      customer.registrationTime = new Date(
        Utils.randomInt(birthday.getTime(), now.getTime()),
      ).toISOString();

      customer.gender = gender;

      customer.birthday = birthday.toISOString();

      customer.city = InstallService.randomArrayItem(CITIES).code;

      customer.annualIncome = Utils.randomInt(1_000, 1_000_000);

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

      customer.numberOfChildren = Utils.randomInt(0, 3);

      customer.phoneNumber = Utils.randomInt(
        10000000000,
        20000000000,
      ).toString();

      customer.weChat =
        'wc' +
        Utils.randomInt(0, 100000)
          .toString()
          .padStart(5, '0');

      const qq = Utils.randomInt(10000, 1000000000).toString();

      customer.qq = qq;

      customer.email = `${qq}@em2046.com`;

      await this.customerRepository.save(customer);
    }
  }

  /**
   * 随机真实姓名
   */
  private static randomRealName(gender) {
    const surname = InstallService.randomArrayItem(SURNAME);

    return surname + InstallService.randomGivenName(gender);
  }

  /**
   * 随机昵称
   */
  private static randomNickName() {
    const adjectiveList = [
      '可爱',
      '自然',
      '完美',
      '光明',
      '真实',
      '冰冷',
      '幸运',
      '华丽',
      '敏捷',
      '神圣',
      '博学',
      '轻松',
      '简单',
      '快乐',
      '悲伤',
      '忧郁',
      '普通',
      '神秘',
      '奇妙',
    ];

    const nounList = [
      '银河🌌',
      '星星🌟',
      '流星🌠',
      '云☁',
      '北风🌬',
      '风景🏖',
      '夜晚🌃',
      '月🌛',
      '彩虹🌈',
      '火苗🔥',
      '狐狸🦊',
      '猫🐱',
      '狗🐕',
      '独角兽🦄',
      '泉水⛲',
      '水滴💧',
      '雪花❄',
      '沙漏⏳',
      '气球🎈',
      '四叶草🍀',
    ];

    const adjective = InstallService.randomArrayItem(adjectiveList);
    const noun = InstallService.randomArrayItem(nounList);
    return `${adjective}之${noun}`;
  }

  /**
   * 随机数组项
   * @param array 数组
   */
  private static randomArrayItem(array) {
    return array[Utils.randomInt(0, array.length)];
  }

  /**
   * 随机名字
   * @param gender 性别
   */
  private static randomGivenName(gender) {
    const maleGivenNameList = [
      '超',
      '伟',
      '涛',
      '磊',
      '鹏',
      '杰',
      '强',
      '浩',
      '鑫',
      '俊',
      '宇',
      '轩',
      '子',
      '然',
      '博',
      '文',
      '涵',
      '皓',
      '昊',
    ];
    const femaleGivenNameList = [
      '静',
      '婷',
      '婷婷',
      '敏',
      '丹',
      '丽',
      '雪',
      '倩',
      '颖',
      '悦',
      '涵',
      '梓',
      '怡',
      '子',
      '萱',
      '欣',
      '可',
      '佳',
      '梦',
      '琪',
    ];

    let givenName = '';
    switch (gender) {
      case CustomerGender.MALE:
        givenName = InstallService.randomArrayItem(maleGivenNameList);
        break;
      case CustomerGender.FEMALE:
        givenName = InstallService.randomArrayItem(femaleGivenNameList);
        break;
      default:
        givenName = InstallService.randomArrayItem(
          maleGivenNameList.concat(femaleGivenNameList),
        );
        break;
    }

    return givenName;
  }

  /**
   * 安装知识库文章
   */
  private async installKnowledge() {
    for (const post of postList) {
      const content = await InstallService.loadFile(
        path.join('../assets/knowledge', post.path),
      );
      const p = {
        title: post.title,
        author: post.author,
        content,
      };
      await this.knowledgeRepository.save(p);
    }
  }

  /**
   * 安装投诉
   */
  private async installComplaint() {
    const supervisor = await this.userRepository.findOne({
      name: 'supervisor',
    });

    for (const complaint of complaintList) {
      const c = {
        title: complaint.title,
        description: complaint.description,
        assignee: supervisor.uuid,
      };
      await this.complaintRepository.save(c);
    }
  }

  static async loadFile(filePath) {
    return (await fsPromises.readFile(
      path.resolve(__dirname, filePath),
      fileOption,
    )) as string;
  }
}
