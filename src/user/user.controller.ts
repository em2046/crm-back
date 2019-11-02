import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from '../permissions.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 查找全部用户
   */
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  /**
   * 查找用户
   * @param uuid 编号
   */
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':uuid')
  findOne(@Param('uuid') uuid) {
    return this.userService.findOne(uuid);
  }

  /**
   * 创建用户
   * @param userCreateDto 用户信息
   */
  @UseGuards(AuthGuard())
  @Permissions('user_create')
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() userCreateDto: UserCreateDto) {
    return this.userService.create(userCreateDto);
  }

  /**
   * 移除用户
   * @param uuid 编号
   */
  @UseGuards(AuthGuard())
  @Permissions('user_delete')
  @Delete(':uuid')
  remove(@Param('uuid') uuid) {
    return this.userService.remove(uuid);
  }

  /**
   * 登录
   * @param userLoginDto 身份信息
   */
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  login(@Body() userLoginDto: UserLoginDto) {
    return this.userService.login(userLoginDto);
  }

  /**
   * 更新用户
   * @param uuid 编号
   * @param userUpdateDto 更新数据
   */
  @UseGuards(AuthGuard())
  @Permissions('user_update')
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':uuid')
  update(@Param('uuid') uuid, @Body() userUpdateDto: UserUpdateDto) {
    return this.userService.update(uuid, userUpdateDto);
  }
}
