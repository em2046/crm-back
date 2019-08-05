import { Body, Controller, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerCreateDto } from './dto/customer-create.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CustomerCreateDto) {
    return this.customerService.create(createCustomerDto);
  }
}
