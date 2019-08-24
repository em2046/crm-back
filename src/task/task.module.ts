import { Module } from '@nestjs/common';
import { ComplaintService } from './complaint-task/complaint.service';
import { ComplaintController } from './complaint-task/complaint.controller';
import { SaleController } from './sale/sale.controller';
import { SaleService } from './sale/sale.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complaint } from './complaint-task/complaint.entity';
import { Sale } from './sale/sale.entity';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Complaint, Sale]),
    UserModule,
  ],
  providers: [ComplaintService, SaleService],
  controllers: [ComplaintController, SaleController],
})
export class TaskModule {}
