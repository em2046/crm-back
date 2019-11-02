import { Module } from '@nestjs/common';
import { SaleCustomerController } from './sale-customer.controller';
import { SaleCustomerService } from './sale-customer.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleCustomer } from './sale-customer.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([SaleCustomer]),
  ],
  controllers: [SaleCustomerController],
  providers: [SaleCustomerService],
})
export class SaleCustomerModule {}
