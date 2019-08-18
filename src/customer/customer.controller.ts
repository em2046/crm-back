import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerCreateDto } from './dto/customer-create.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  /**
   * 查找全部客户
   */
  @UseGuards(AuthGuard())
  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  /**
   * 新建客户
   * @param createCustomerDto 客户信息
   */
  @UseGuards(AuthGuard())
  @Post()
  create(@Body() createCustomerDto: CustomerCreateDto) {
    return this.customerService.create(createCustomerDto);
  }
}
