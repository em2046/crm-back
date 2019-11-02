import { Body, Controller, Param, Patch } from '@nestjs/common';
import { SaleCustomerUpdateDto } from './dto/sale-customer-update.dto';
import { SaleCustomerService } from './sale-customer.service';

@Controller('sale-customer')
export class SaleCustomerController {
  constructor(private readonly saleCustomerService: SaleCustomerService) {}

  @Patch(':uuid/update')
  update(
    @Param('uuid') uuid,
    @Body() saleCustomerUpdateDto: SaleCustomerUpdateDto,
  ) {
    return this.saleCustomerService.update(uuid, saleCustomerUpdateDto);
  }
}
