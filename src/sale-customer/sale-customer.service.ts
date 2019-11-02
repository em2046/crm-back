import { Injectable, NotAcceptableException } from '@nestjs/common';
import { SaleCustomerUpdateDto } from './dto/sale-customer-update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleCustomer } from './sale-customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SaleCustomerService {
  constructor(
    @InjectRepository(SaleCustomer)
    private readonly saleCustomerRepository: Repository<SaleCustomer>,
  ) {}

  async update(uuid: string, saleCustomerUpdateDto: SaleCustomerUpdateDto) {
    const foundSaleCustomer = await this.saleCustomerRepository.findOne(uuid);
    if (!foundSaleCustomer) {
      throw new NotAcceptableException('未找到任务');
    }

    foundSaleCustomer.finished = saleCustomerUpdateDto.finished;

    return this.saleCustomerRepository.save(foundSaleCustomer);
  }
}
