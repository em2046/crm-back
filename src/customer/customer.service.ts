import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CustomerCreateDto } from './dto/customer-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CustomerCreateDto): Promise<Customer> {
    //region 查询是否已有此客户
    const foundCustomerName = await this.customerRepository.findOne({
      name: createCustomerDto.name,
    });
    if (foundCustomerName) {
      throw new NotAcceptableException('用户名已经存在');
    }
    //endregion

    return await this.customerRepository.save(createCustomerDto);
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }
}
