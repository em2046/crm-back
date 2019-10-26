import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Length } from 'class-validator';
import { User } from '../user/user.entity';

/**
 * 任务状态
 */
export enum TaskStatus {
  /**
   * 已创建
   */
  CREATED = 'created',

  /**
   * 已分配
   */
  ASSIGNED = 'assigned',

  /**
   * 已完成
   */
  FINISHED = 'finished',
}

/**
 * 任务
 */
@Entity()
export abstract class Task {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  /**
   * 标题
   */
  @Length(1, 64)
  @Column({ length: 64, nullable: false })
  title: string;

  /**
   * 描述
   */
  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(type => User, user => user.tasks)
  assignee: User;

  /**
   * 状态
   */
  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.CREATED,
    nullable: false,
  })
  status: TaskStatus;

  @CreateDateColumn()
  createDate;

  @UpdateDateColumn()
  updateDate;
}
