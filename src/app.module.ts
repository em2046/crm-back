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
import { TaskModule } from './task/task.module';
import { KnowledgeModule } from './knowledge/knowledge.module';
import { LabelModule } from './label/label.module';
import { StatisticsModule } from './statistics/statistics.module';
import { SaleCustomerModule } from './sale-customer/sale-customer.module';
import { PermissionsGuard } from './permissions.guard';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'crm',
      password: 'Crm@em2046.com',
      database: 'crm',
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
      charset: 'utf8mb4',
    }),
    MenuModule,
    UserModule,
    CustomerModule,
    RoleModule,
    PermissionModule,
    AuthModule,
    InstallModule,
    TaskModule,
    KnowledgeModule,
    LabelModule,
    StatisticsModule,
    SaleCustomerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule {}
