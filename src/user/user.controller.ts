import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserUpdateDto } from './dto/user-update.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createUserDto: UserCreateDto) {
    return this.userService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  login(@Body() loginUserDto: UserLoginDto) {
    return this.userService.login(loginUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':uuid')
  update(@Param('uuid') uuid, @Body() userUpdateDto: UserUpdateDto) {
    return this.userService.update(uuid, userUpdateDto);
  }
}
