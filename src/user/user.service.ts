import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import Utils from '../utils/utils';
import { LoginUserDto } from './dto/login-user.dto';
import { HttpResult } from '../dto/http-result';

export enum UserCreateCode {
  SUCCESS = 0,
  NAME_ALREADY_EXISTS = 1,
  EMAIL_ALREADY_EXISTS = 2,
}

export enum UserLoginCode {
  SUCCESS = 0,
  NAME_OR_PASSWORD_INCORRECT = 1,
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * 创建用户
   * @param createUserDto 新用户信息
   */
  async create(
    createUserDto: CreateUserDto,
  ): Promise<HttpResult<UserCreateCode>> {
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

    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.avatar = createUserDto.avatar;

    const salt = await Utils.randomBytesPromise();
    user.salt = salt;

    user.password = await Utils.pbkdf2Promise(createUserDto.password, salt);

    await this.userRepository.save(user);
    return {
      code: UserCreateCode.SUCCESS,
      message: 'create user success',
    };
  }

  /**
   * 登录
   * @param loginUserDto 登录用户信息
   */
  async login(loginUserDto: LoginUserDto): Promise<HttpResult<UserLoginCode>> {
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

    return {
      code: UserLoginCode.SUCCESS,
      message: 'Login success',
      data: retUser,
    };
  }
}
