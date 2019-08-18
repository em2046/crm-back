import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 验证用户
   * @param username 用户名
   * @param password 密码
   */
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.login({ name: username, password });
    if (user) {
      return {
        name: user.name,
        uuid: user.uuid,
      };
    }
    return null;
  }

  /**
   * 登录
   * @param user 用户
   */
  async login(user: any) {
    const payload = { uuid: user.uuid, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
