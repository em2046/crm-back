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
import { AuthGuard } from '@nestjs/passport';
import { ComplaintCreateDto } from './dto/complaint-create.dto';
import { ComplaintService } from './complaint.service';
import { ComplaintMutateDto } from './dto/complaint-mutate.dto';
import { ComplaintFindAllDto } from './dto/complaint-find-all.dto';

@Controller('complaint')
export class ComplaintController {
  constructor(private readonly complaintService: ComplaintService) {}

  /**
   * 查询全部投诉
   */
  @UseGuards(AuthGuard())
  @Get()
  findAll(@Query() complaintFindAllDto: ComplaintFindAllDto) {
    return this.complaintService.findAll(complaintFindAllDto);
  }

  /**
   * 创建投诉
   */
  @UseGuards(AuthGuard())
  @Post()
  create(@Body() complaintCreateDto: ComplaintCreateDto) {
    return this.complaintService.create(complaintCreateDto);
  }

  /**
   * 分配
   * @param uuid 编号
   * @param complaintMutateDto 数据
   */
  @Patch(':uuid/assign')
  assign(@Param('uuid') uuid, @Body() complaintMutateDto: ComplaintMutateDto) {
    return this.complaintService.assign(uuid, complaintMutateDto);
  }

  /**
   * 完成
   * @param uuid 编号
   * @param complaintMutateDto 数据
   */
  @Patch(':uuid/finish')
  finish(@Param('uuid') uuid, @Body() complaintMutateDto: ComplaintMutateDto) {
    return this.complaintService.finish(uuid, complaintMutateDto);
  }

  @UseGuards(AuthGuard())
  @Delete(':uuid')
  remove(@Param('uuid') uuid) {
    return this.complaintService.remove(uuid);
  }
}
