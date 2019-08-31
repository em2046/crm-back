import {
  Body,
  Controller,
  ForbiddenException,
  Post,
} from '@nestjs/common';
import { InstallService } from './install.service';

interface ValidateInfo {
  username: string;
  password: string;
}

@Controller('install')
export class InstallController {
  constructor(private readonly installService: InstallService) {}

  /**
   * 安装全部
   * @param validateInfo 身份验证信息
   */
  @Post()
  installAll(@Body() validateInfo: ValidateInfo) {
    if (!(validateInfo.username && validateInfo.password)) {
      throw new ForbiddenException();
    }
    return this.installService.installAll(validateInfo);
  }
}
