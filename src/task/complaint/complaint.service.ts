import { Injectable, NotAcceptableException } from '@nestjs/common';
import { ComplaintCreateDto } from './dto/complaint-create.dto';
import { Complaint } from './complaint.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskStatus } from '../task.entity';
import { ComplaintMutateDto } from './dto/complaint-mutate.dto';
import { UserService } from '../../user/user.service';
import { ComplaintFindAllDto } from './dto/complaint-find-all.dto';

@Injectable()
export class ComplaintService {
  constructor(
    @InjectRepository(Complaint)
    private readonly complaintRepository: Repository<Complaint>,
    private readonly userService: UserService,
  ) {}

  async create(complaintCreateDto: ComplaintCreateDto): Promise<Complaint> {
    //region 查询是否已有此任务
    const foundTask = await this.complaintRepository.findOne({
      title: complaintCreateDto.title,
    });
    if (foundTask) {
      throw new NotAcceptableException('任务已经存在');
    }
    //endregion

    //region 查询用户是否存在
    const assignee = complaintCreateDto.assignee;
    const userExist = await this.userService.exist(assignee);

    if (!userExist) {
      throw new NotAcceptableException('用户不存在');
    }
    //endregion

    const newComplaint = new Complaint();
    newComplaint.assignee = complaintCreateDto.assignee;
    newComplaint.title = complaintCreateDto.title;
    newComplaint.description = complaintCreateDto.description;
    newComplaint.status = TaskStatus.CREATED;
    return await this.complaintRepository.save(newComplaint);
  }

  async findAll(complaintFindAllDto: ComplaintFindAllDto) {
    const page = parseInt(complaintFindAllDto.page, 10);
    const limit = parseInt(complaintFindAllDto.limit, 10);

    const options = {
      skip: (page - 1) * limit,
      take: limit,
    };
    const count = await this.complaintRepository.count(options);

    const data = await this.complaintRepository.find(options);
    return {
      count: data.length,
      data,
      page,
      pageCount: Math.ceil(count / limit),
      total: count,
    };
  }

  async assign(uuid: string, complaintAssignDto: ComplaintMutateDto) {
    const assignee = complaintAssignDto.assignee;
    this.mutation(uuid, assignee, TaskStatus.ASSIGNED);
  }

  async finish(uuid: string, complaintFinishDto: ComplaintMutateDto) {
    const assignee = complaintFinishDto.assignee;
    this.mutation(uuid, assignee, TaskStatus.FINISHED);
  }

  /**
   * 任务状态变更
   * @param uuid 任务编号
   * @param assignee 被指派人
   * @param status 变更后的状态
   */
  async mutation(uuid: string, assignee: string, status: TaskStatus) {
    //region 查询是否已有此任务
    const task = await this.complaintRepository.findOne(uuid);
    if (!task) {
      throw new NotAcceptableException('任务不存在');
    }
    //endregion

    //region 查询用户是否存在
    const userExist = await this.userService.exist(assignee);

    if (!userExist) {
      throw new NotAcceptableException('用户不存在');
    }
    //endregion

    task.assignee = assignee;
    task.status = status;

    return await this.complaintRepository.save(task);
  }

  async remove(uuid: string) {
    return await this.complaintRepository.delete(uuid);
  }
}
