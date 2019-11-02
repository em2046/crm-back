import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleFindAllDto } from './dto/sale-find-all.dto';
import { SaleUpdateDto } from './dto/sale-update.dto';
import { SaleMutateDto } from './dto/sale-mutate.dto';
import { AuthGuard } from '@nestjs/passport';
import { SaleCreateDto } from './dto/sale-create.dto';
import { Permissions } from '../../permissions.decorator';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @UseGuards(AuthGuard())
  @Get()
  findAll(@Query() saleFindAllDto: SaleFindAllDto) {
    return this.saleService.findAll(saleFindAllDto);
  }

  @UseGuards(AuthGuard())
  @Get(':uuid')
  findOne(@Param('uuid') uuid) {
    return this.saleService.findOne(uuid);
  }

  @UseGuards(AuthGuard())
  @Patch(':uuid/update')
  update(@Param('uuid') uuid, @Body() saleUpdateDto: SaleUpdateDto) {
    return this.saleService.update(uuid, saleUpdateDto);
  }

  @UseGuards(AuthGuard())
  @Permissions('task_create')
  @Post()
  create(@Body() saleCreateDto: SaleCreateDto) {
    return this.saleService.create(saleCreateDto);
  }

  /**
   * 分配
   * @param uuid 编号
   * @param saleMutateDto 数据
   */
  @UseGuards(AuthGuard())
  @Permissions('task_assign')
  @Patch(':uuid/assign')
  assign(@Param('uuid') uuid, @Body() saleMutateDto: SaleMutateDto) {
    return this.saleService.assign(uuid, saleMutateDto);
  }

  /**
   * 完成
   * @param uuid 编号
   * @param saleMutateDto 数据
   */
  @UseGuards(AuthGuard())
  @Permissions('task_execute')
  @Patch(':uuid/finish')
  finish(@Param('uuid') uuid, @Body() saleMutateDto: SaleMutateDto) {
    return this.saleService.finish(uuid, saleMutateDto);
  }

  @UseGuards(AuthGuard())
  @Permissions('task_delete')
  @Delete(':uuid')
  remove(@Param('uuid') uuid) {
    return this.saleService.remove(uuid);
  }
}
