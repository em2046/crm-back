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
   * @param createUserDto 用户信息
   */
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createUserDto: UserCreateDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * 移除用户
   * @param uuid 编号
   */
  @UseGuards(AuthGuard())
  @Delete(':uuid')
  remove(@Param('uuid') uuid) {
    this.userService.remove(uuid);
    return {
      statusCode: 0,
      message: '删除成功',
    };
  }

  /**
   * 登录
   * @param loginUserDto 身份信息
   */
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  login(@Body() loginUserDto: UserLoginDto) {
    return this.userService.login(loginUserDto);
  }

  /**
   * 更新用户
   * @param uuid 编号
   * @param userUpdateDto 更新数据
   */
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':uuid')
  update(@Param('uuid') uuid, @Body() userUpdateDto: UserUpdateDto) {
    return this.userService.update(uuid, userUpdateDto);
  }
}
