import { Injectable } from '@nestjs/common';
import { CustomerCreateDto } from './dto/customer-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
import { HttpResult } from '../dto/http-result';
import { CustomerCreateCode } from './enum/customer-create-code';
import { CustomerFindAllCode } from './enum/customer-find-all-code';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(
    createCustomerDto: CustomerCreateDto,
  ): Promise<HttpResult<CustomerCreateCode, Customer>> {
    // 查询是否已有此客户

    const foundCustomerName = await this.customerRepository.findOne({
      name: createCustomerDto.name,
    });
    if (foundCustomerName) {
      return {
        code: CustomerCreateCode.NAME_ALREADY_EXISTS,
        message: 'name already exists',
      };
    }

    const savedCustomer = await this.customerRepository.save(createCustomerDto);
    return {
      code: CustomerCreateCode.SUCCESS,
      message: 'create customer success',
      data: savedCustomer,
    };
  }

  async findAll(): Promise<HttpResult<CustomerFindAllCode, Customer[]>> {
    const customers = await this.customerRepository.find();
    return {
      code: CustomerFindAllCode.SUCCESS,
      message: 'find all customer success',
      data: customers,
    };
  }
}
