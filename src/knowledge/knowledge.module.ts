import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Knowledge } from './knowledge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Knowledge])],
})
export class KnowledgeModule {}
