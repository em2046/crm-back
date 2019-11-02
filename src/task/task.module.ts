import { Module } from '@nestjs/common';
import { ComplaintService } from './complaint/complaint.service';
import { ComplaintController } from './complaint/complaint.controller';
import { SaleController } from './sale/sale.controller';
import { SaleService } from './sale/sale.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complaint } from './complaint/complaint.entity';
import { Sale } from './sale/sale.entity';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { Label } from '../label/label.entity';
import { User } from '../user/user.entity';
import { Customer } from '../customer/customer.entity';
import { CustomerModule } from '../customer/customer.module';
import { LabelModule } from '../label/label.module';
import { SaleCustomer } from '../sale-customer/sale-customer.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([
      Complaint,
      Sale,
      Label,
      User,
      Customer,
      SaleCustomer,
    ]),
    UserModule,
    CustomerModule,
    LabelModule,
  ],
  exports: [ComplaintService, SaleService],
  providers: [ComplaintService, SaleService],
  controllers: [ComplaintController, SaleController],
})
export class TaskModule {}
