import { Module } from '@nestjs/common';
import { InstallController } from './install.controller';
import { InstallService } from './install.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { Role } from '../role/role.entity';
import { Permission } from '../permission/permission.entity';
import { Customer } from '../customer/customer.entity';
import { Knowledge } from '../knowledge/knowledge.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Permission, Customer, Knowledge]),
    UserModule,
  ],
  controllers: [InstallController],
  providers: [InstallService],
})
export class InstallModule {}
