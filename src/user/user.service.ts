import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import Utils from '../utils/utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.avatar = createUserDto.avatar;

    const salt = await Utils.randomBytesPromise();
    user.salt = salt;

    user.password = await Utils.pbkdf2Promise(createUserDto.password, salt);

    return await this.userRepository.save(user);
  }
}
