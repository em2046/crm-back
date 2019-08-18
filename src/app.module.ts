import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { MenuModule } from './menu/menu.module';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { AuthModule } from './auth/auth.module';
import { InstallModule } from './install/install.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'crm',
      password: 'Crm@em2046.com',
      database: 'crm',
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
    }),
    MenuModule,
    UserModule,
    CustomerModule,
    RoleModule,
    PermissionModule,
    AuthModule,
    InstallModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
