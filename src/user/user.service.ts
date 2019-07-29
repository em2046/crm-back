const crypto = require('crypto');

function pbkdf2Promise(password: string) {
  return new Promise(resolve => {
    crypto.pbkdf2(password, 'salt', 100000, 64, 'sha512', (err, derivedKey) => {
      if (err) {
        throw err;
      }
      const encrypted: string = derivedKey.toString('hex');

      resolve(encrypted);
    });
  });
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

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

    user.password = await pbkdf2Promise(createUserDto.password);

    return await this.userRepository.save(user);
  }
}
