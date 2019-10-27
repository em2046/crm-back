import { Body, Controller, Post } from '@nestjs/common';
import { CustomerService } from '../customer/customer.service';

@Controller('label')
export class LabelController {
  constructor(public customerService: CustomerService) {}

  @Post('query')
  async query(@Body() queryDto) {
    return await this.customerService.query(queryDto);
  }
}
