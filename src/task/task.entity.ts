import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Length } from 'class-validator';

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

  /**
   * 当前处理人
   */
  @Column()
  assignee: string;

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
