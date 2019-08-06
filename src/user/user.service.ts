import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import Utils from '../utils/utils';
import { UserLoginDto } from './dto/user-login.dto';
import { HttpResult } from '../dto/http-result';
import { UserCreateCode } from './enum/user-create-code';
import { UserLoginCode } from './enum/user-login-code';
import { UserFindAllCode } from './enum/user-find-all-code';

@Injectable()
export class UserService {
  private readonly users: User[];

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  /**
   * 创建用户
   * @param createUserDto 新用户信息
   */
  async create(
    createUserDto: UserCreateDto,
  ): Promise<HttpResult<UserCreateCode, User>> {
    // 查询是否已有此用户名
    const foundUserName = await this.userRepository.findOne({
      name: createUserDto.name,
    });
    if (foundUserName) {
      return {
        code: UserCreateCode.NAME_ALREADY_EXISTS,
        message: 'name already exists',
      };
    }

    // 查询是否已有此邮箱
    const foundUserEmail = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    if (foundUserEmail) {
      return {
        code: UserCreateCode.EMAIL_ALREADY_EXISTS,
        message: 'email already exists',
      };
    }

    const newUser = new User();
    newUser.name = createUserDto.name;
    newUser.email = createUserDto.email;
    newUser.avatar = createUserDto.avatar;
    newUser.realName = createUserDto.realName;

    const salt = await Utils.randomBytesPromise();
    newUser.salt = salt;

    newUser.password = await Utils.pbkdf2Promise(createUserDto.password, salt);

    const retUser = new User();

    const savedUser = await this.userRepository.save(newUser);

    retUser.name = savedUser.name;
    retUser.email = savedUser.email;
    retUser.avatar = savedUser.avatar;
    retUser.realName = savedUser.realName;

    return {
      code: UserCreateCode.SUCCESS,
      message: 'create user success',
      data: retUser,
    };
  }

  /**
   * 登录
   * @param loginUserDto 登录用户信息
   */
  async login(
    loginUserDto: UserLoginDto,
  ): Promise<HttpResult<UserLoginCode, User>> {
    const errorRet = {
      code: UserLoginCode.NAME_OR_PASSWORD_INCORRECT,
      message: 'name or password incorrect',
    };

    // 查找是否有对应的用户名
    const foundUser = await this.userRepository.findOne({
      name: loginUserDto.name,
    });

    // 未找到用户
    if (!foundUser) {
      return errorRet;
    }

    // 验证密码是否匹配
    const passwordHash = await Utils.pbkdf2Promise(
      loginUserDto.password,
      foundUser.salt,
    );

    // 密码不匹配
    if (passwordHash !== foundUser.password) {
      return errorRet;
    }

    const retUser = new User();
    retUser.uuid = foundUser.uuid;
    retUser.name = foundUser.name;
    retUser.email = foundUser.email;
    retUser.avatar = foundUser.avatar;
    retUser.realName = foundUser.realName;

    return {
      code: UserLoginCode.SUCCESS,
      message: 'login success',
      data: retUser,
    };
  }

  async findAll(): Promise<HttpResult<UserFindAllCode, User[]>> {
    const users = await this.userRepository.find();
    const retUsers = users.map(user => {
      const retUser = new User();
      retUser.uuid = user.uuid;
      retUser.name = user.name;
      retUser.email = user.email;
      retUser.avatar = user.avatar;
      retUser.realName = user.realName;
      return retUser;
    });
    return {
      code: UserFindAllCode.SUCCESS,
      message: 'find all user success',
      data: retUsers,
    };
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => {
      return user.username === username;
    });
  }
}
