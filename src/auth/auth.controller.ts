import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  /**
   * 登录
   * @param req 用户名&密码
   */
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  /**
   * 获取用户信息
   * @param req 请求
   */
  @UseGuards(AuthGuard())
  @Get('me')
  @UseInterceptors(ClassSerializerInterceptor)
  getProfile(@Request() req) {
    return this.userService.findOne(req.user.uuid);
  }
}
