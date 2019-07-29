import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 用户
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  /**
   * 用户名
   */
  @Index('user_name_index', { unique: true })
  @Column({ length: 256, nullable: false })
  name: string;

  /**
   * 邮箱地址
   */
  @Index('user_email_index', { unique: true })
  @Column({ length: 512, nullable: false })
  email: string;

  /**
   * 密码
   */
  @Column({ length: 512, nullable: false })
  password: string;

  /**
   * 头像
   */
  @Column({ length: 4096 })
  avatar: string;
}