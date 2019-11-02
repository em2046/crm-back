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
import { Complaint } from '../task/complaint/complaint.entity';
import { Label } from '../label/label.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([
      User,
      Role,
      Permission,
      Customer,
      Knowledge,
      Complaint,
      Label,
    ]),
    UserModule,
  ],
  controllers: [InstallController],
  providers: [InstallService],
})
export class InstallModule {}
