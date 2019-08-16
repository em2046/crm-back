import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerCreateDto } from './dto/customer-create.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @UseGuards(AuthGuard())
  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @UseGuards(AuthGuard())
  @Post()
  create(@Body() createCustomerDto: CustomerCreateDto) {
    return this.customerService.create(createCustomerDto);
  }
}
