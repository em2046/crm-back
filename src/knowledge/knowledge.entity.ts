import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  @Column()
  title: string;

  /**
   * 内容
   */
  @Column({ type: 'text' })
  content: string;

  /**
   * 作者
   */
  @Column()
  author: string;

  @CreateDateColumn()
  createDate;

  @UpdateDateColumn()
  updateDate;
}
