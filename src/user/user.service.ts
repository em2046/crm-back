import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import Utils from '../utils/utils';
import { UserLoginDto } from './dto/user-login.dto';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService {
  constructor(
    private readonly roleService: RoleService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * 创建用户
   * @param createUserDto 新用户信息
   */
  async create(createUserDto: UserCreateDto): Promise<User> {
    //
    //region 查询是否已有此用户名
    const foundUserName = await this.userRepository.findOne({
      name: createUserDto.name,
    });
    if (foundUserName) {
      throw new NotAcceptableException('用户名已经存在');
    }
    //endregion

    //
    //region 查询是否已有此邮箱
    const foundUserEmail = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    if (foundUserEmail) {
      throw new NotAcceptableException('邮箱地址已经存在');
    }
    //endregion

    //region 密码安全存储
    const newUser = new User();
    newUser.name = createUserDto.name;
    newUser.email = createUserDto.email;
    newUser.avatar = createUserDto.avatar;
    newUser.realName = createUserDto.realName;

    const salt = await Utils.randomBytesPromise();
    newUser.salt = salt;

    newUser.password = await Utils.pbkdf2Promise(createUserDto.password, salt);
    //endregion

    return await this.userRepository.save(newUser);
  }

  /**
   * 登录
   * @param loginUserDto 登录用户信息
   */
  async login(loginUserDto: UserLoginDto): Promise<User> {
    const errorMessage = '用户名或密码错误';

    //region 查找是否有对应的用户名
    const foundUser = await this.userRepository.findOne({
      name: loginUserDto.name,
    });

    if (!foundUser) {
      throw new NotAcceptableException(errorMessage);
    }
    //endregion

    //region 验证密码是否匹配
    const passwordHash = await Utils.pbkdf2Promise(
      loginUserDto.password,
      foundUser.salt,
    );

    if (passwordHash !== foundUser.password) {
      throw new NotAcceptableException(errorMessage);
    }
    //endregion

    return foundUser;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['roles'] });
  }

  async update(uuid, userUpdateDto): Promise<User> {
    const foundUser = await this.userRepository.findOne({ uuid });
    foundUser.roles = await this.roleService.findSome(userUpdateDto.roles);

    return await this.userRepository.save(foundUser);
  }
}
