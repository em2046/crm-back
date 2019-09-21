import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';

/**
 * 知识
 */
@Entity()
export class Knowledge {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  /**
   * 标题
   */
  @IsNotEmpty()
  @Length(1, 64)
  @Column({ length: 64 })
  title: string;

  /**
   * 内容
   */
  @IsOptional()
  @Column({ type: 'text', nullable: true })
  content: string;

  /**
   * 作者
   */
  @IsOptional()
  @Column({ length: 64, nullable: true })
  author: string;

  /**
   * 创建时间
   */
  @CreateDateColumn()
  createDate;

  /**
   * 更新时间
   */
  @UpdateDateColumn()
  updateDate;
}
