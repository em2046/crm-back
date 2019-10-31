import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Role } from '../role/role.entity';
import { Customer } from '../customer/customer.entity';
import { Knowledge } from '../knowledge/knowledge.entity';
import { Complaint } from '../task/complaint/complaint.entity';
import { Label } from '../label/label.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Role,
      Customer,
      Knowledge,
      Complaint,
      Label,
    ]),
  ],
  providers: [StatisticsService],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
