import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Knowledge } from './knowledge.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class KnowledgeService extends TypeOrmCrudService<Knowledge> {
  constructor(
    @InjectRepository(Knowledge)
    private readonly knowledgeRepository: Repository<Knowledge>,
  ) {
    super(knowledgeRepository);
  }

  async search(keyword: string) {
    return await this.knowledgeRepository.find({
      content: Like(`%${keyword}%`),
    });
  }
}
