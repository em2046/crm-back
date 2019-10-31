import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { Role } from '../role/role.entity';
import { Customer, CustomerType } from '../customer/customer.entity';
import { Knowledge } from '../knowledge/knowledge.entity';
import { Complaint } from '../task/complaint/complaint.entity';
import { Label } from '../label/label.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Knowledge)
    private readonly knowledgeRepository: Repository<Knowledge>,
    @InjectRepository(Complaint)
    private readonly complaintRepository: Repository<Complaint>,
    @InjectRepository(Label)
    private readonly labelRepository: Repository<Label>,
  ) {}

  async findAll() {
    const userSelectQueryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles');

    const staffCount = await userSelectQueryBuilder
      .where('roles.name = :name', { name: 'staff' })
      .getCount();

    const supervisorCount = await userSelectQueryBuilder
      .where('roles.name = :name', { name: 'supervisor' })
      .getCount();

    const operatorCount = await userSelectQueryBuilder
      .where('roles.name = :name', { name: 'operator' })
      .getCount();

    const customerCount = await this.customerRepository.count();
    const vipCount = await this.customerRepository.count({
      where: {
        type: CustomerType.VIP,
      },
    });
    const labelCount = await this.labelRepository.count();
    const knowledgeCount = await this.knowledgeRepository.count();

    return {
      user: {
        staffCount,
        supervisorCount,
        operatorCount,
      },
      customer: {
        customerCount,
        vipCount,
      },
      labelCount,
      knowledgeCount,
    };
  }
}
