import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './sale.entity';
import { In, Repository } from 'typeorm';
import { UserService } from '../../user/user.service';
import { LabelService } from '../../label/label.service';
import { CustomerService } from '../../customer/customer.service';
import { SaleCreateDto } from './dto/sale-create.dto';
import { TaskStatus } from '../task.entity';
import { SaleFindAllDto } from './dto/sale-find-all.dto';
import { User } from '../../user/user.entity';
import Filter from '../../utils/filter';
import { SaleMutateDto } from './dto/sale-mutate.dto';
import { SaleUpdateDto } from './dto/sale-update.dto';
import { Complaint } from '../complaint/complaint.entity';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
    private readonly userService: UserService,
    private readonly labelService: LabelService,
    private readonly customerService: CustomerService,
  ) {}

  async create(saleCreateDto: SaleCreateDto) {
    //region 查询是否已有此任务
    const foundTask = await this.saleRepository.findOne({
      title: saleCreateDto.title,
    });
    if (foundTask) {
      throw new NotAcceptableException('任务已经存在');
    }
    //endregion

    //region 查询用户是否存在
    const assignee = saleCreateDto.assignee;
    const userExist = await this.userService.exist(assignee.uuid);

    if (!userExist) {
      throw new NotAcceptableException('用户不存在');
    }
    //endregion

    const label = saleCreateDto.label;
    const foundLabel = await this.labelService.findOne(label.uuid);
    const customersRaw = await this.customerService.query(foundLabel.rule);

    const customerList = customersRaw.map(customer => {
      return customer.uuid;
    });

    let customers = [];
    if (customerList.length) {
      customers = await this.customerService.find({
        uuid: In(customerList),
      });
    }

    const newSale = new Sale();
    newSale.assignee = saleCreateDto.assignee;
    newSale.title = saleCreateDto.title;
    newSale.description = saleCreateDto.description;
    newSale.status = TaskStatus.CREATED;
    newSale.customers = customers;
    return await this.saleRepository.save(newSale);
  }

  async findAll(saleFindAllDto: SaleFindAllDto) {
    const page = parseInt(saleFindAllDto.page, 10);
    const limit = parseInt(saleFindAllDto.limit, 10);

    const relations = ['assignee'];
    const options = {
      skip: (page - 1) * limit,
      take: limit,
      relations,
    };
    const count = await this.saleRepository.count(options);

    const data = await this.saleRepository.find(options);

    data.forEach(item => {
      item.assignee = Filter.userFilter(item.assignee) as User;
    });

    return {
      count: data.length,
      data,
      page,
      pageCount: Math.ceil(count / limit),
      total: count,
    };
  }

  async findOne(uuid: string) {
    const sale = await this.saleRepository.findOne(uuid, {
      relations: ['assignee', 'customers'],
    });
    sale.assignee = Filter.userFilter(sale.assignee) as User;
    return sale;
  }

  async remove(uuid: string) {
    return await this.saleRepository.delete(uuid);
  }

  async assign(uuid: string, saleMutateDto: SaleMutateDto) {
    const assignee = saleMutateDto.assignee;
    await this.mutation(uuid, assignee, TaskStatus.ASSIGNED);
  }

  async mutation(uuid: string, assignee: User, status: TaskStatus) {
    //region 查询是否已有此任务
    const task = await this.saleRepository.findOne(uuid);
    if (!task) {
      throw new NotAcceptableException('任务不存在');
    }
    //endregion

    //region 查询用户是否存在
    const userExist = await this.userService.exist(assignee.uuid);

    if (!userExist) {
      throw new NotAcceptableException('用户不存在');
    }
    //endregion

    task.assignee = assignee;
    task.status = status;

    return await this.saleRepository.save(task);
  }

  async finish(uuid: string, saleMutateDto: SaleMutateDto) {
    const assignee = saleMutateDto.assignee;
    await this.mutation(uuid, assignee, TaskStatus.FINISHED);
  }

  async update(uuid: string, saleUpdateDto: SaleUpdateDto): Promise<Complaint> {
    const foundComplaint = await this.saleRepository.findOne(uuid);
    if (!foundComplaint) {
      throw new NotAcceptableException('未找到任务');
    }

    foundComplaint.title = saleUpdateDto.title;
    foundComplaint.description = saleUpdateDto.description;

    return this.saleRepository.save(foundComplaint);
  }
}
