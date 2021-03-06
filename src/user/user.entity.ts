import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../role/role.entity';
import { Exclude } from 'class-transformer';
import { Task } from '../task/task.entity';

/**
 * 用户
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  /**
   * 系统用户名
   */
  @Index('user_name_index', { unique: true })
  @Column({ length: 256, nullable: false })
  name: string;

  /**
   * 真实姓名
   */
  @Column({ length: 64, nullable: true })
  realName: string;

  /**
   * 邮箱地址
   */
  @Index('user_email_index', { unique: true })
  @Column({ length: 512, nullable: false })
  email: string;

  /**
   * 密码
   */
  @Exclude()
  @Column({ length: 256, nullable: false })
  password: string;

  /**
   * 盐
   */
  @Exclude()
  @Column({ length: 256, nullable: false })
  salt: string;

  /**
   * 头像
   */
  @Column({ length: 4096, nullable: true })
  avatar: string;

  /**
   * 角色
   */
  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @OneToMany(type => Task, task => task.assignee)
  tasks: Task[];
}
