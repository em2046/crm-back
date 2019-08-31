import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 用户类型
 */
export enum CustomerType {
  /**
   * 普通
   */
  NORMAL = '',

  /**
   * 会员
   */
  VIP = 'vip',
}

/**
 * 用户等级
 */
export enum CustomerLevel {
  LEVEL_0 = 0,
  LEVEL_1 = 1,
  LEVEL_2 = 2,
  LEVEL_3 = 3,
  LEVEL_4 = 4,
  LEVEL_5 = 5,
  LEVEL_6 = 6,
}

/**
 * 性别
 */
export enum CustomerGender {
  /**
   * 未知
   */
  UN_KNOW = '',

  /**
   * 男性
   */
  MALE = 'male',

  /**
   * 女性
   */
  FEMALE = 'female',

  /**
   * 其他
   */
  OTHER = 'other',
}

/**
 * 学历
 */
export enum CustomerEducation {
  /**
   * 未知
   */
  UN_KNOW = '',

  /**
   * 专科
   */
  ASSOCIATE = 'associate',

  /**
   * 本科
   */
  BACHELOR = 'bachelor',

  /**
   * 硕士
   */
  MASTER = 'master',

  /**
   * 博士
   */
  DOCTOR = 'doctor',

  /**
   * 其他
   */
  OTHER = 'other',
}

/**
 * 婚姻状况
 */
export enum CustomerMaritalStatus {
  /**
   * 未知
   */
  UN_KNOW = '',

  /**
   * 已婚
   */
  MARRIED = 'married',

  /**
   * 未婚
   */
  UNMARRIED = 'unmarried',

  /**
   * 其他
   */
  OTHER = 'other',
}

/**
 * 客户
 */
@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  /**
   * 客户用户名
   */
  @Index('customer_name_index', { unique: true })
  @Column({ length: 256, nullable: false })
  name: string;

  /**
   * 昵称
   */
  @Column({ length: 64, nullable: false })
  nickName: string;

  /**
   * 真实姓名
   */
  @Column({ length: 64, nullable: true })
  realName: string;

  /**
   * 类型
   */
  @Column({
    type: 'enum',
    enum: CustomerType,
    default: CustomerType.NORMAL,
    nullable: true,
  })
  type: CustomerType;

  /**
   * 等级
   */
  @Column({
    type: 'enum',
    enum: CustomerLevel,
    default: CustomerLevel.LEVEL_0,
    nullable: true,
  })
  level: CustomerLevel;

  /**
   * 注册时间
   */
  @Column({ type: 'datetime', nullable: true })
  registrationTime: string;

  /**
   * 性别
   */
  @Column({
    type: 'enum',
    enum: CustomerGender,
    default: CustomerGender.UN_KNOW,
    nullable: true,
  })
  gender: CustomerGender;

  /**
   * 生日
   */
  @Column({ type: 'datetime', nullable: true })
  birthday: string;

  /**
   * 城市
   */
  @Column({ length: 64, nullable: true })
  city: string;

  /**
   * 职业
   */
  @Column({ length: 64, nullable: true })
  occupation: string;

  /**
   * 年收入
   * 单位元
   */
  @Column({ type: 'int', nullable: true })
  annualIncome: number;

  /**
   * 学历
   */
  @Column({
    type: 'enum',
    enum: CustomerEducation,
    default: CustomerEducation.UN_KNOW,
    nullable: true,
  })
  education: CustomerEducation;

  /**
   * 婚姻状况
   */
  @Column({
    type: 'enum',
    enum: CustomerMaritalStatus,
    default: CustomerMaritalStatus.UN_KNOW,
    nullable: true,
  })
  maritalStatus: CustomerMaritalStatus;

  /**
   * 孩子数量
   */
  @Column({ type: 'tinyint', nullable: true })
  numberOfChildren: number;

  /**
   * 手机号
   */
  @Column({ length: 64, nullable: true })
  phoneNumber: string;

  /**
   * 微信号
   */
  @Column({ length: 64, nullable: true })
  weChat: string;

  /**
   * QQ号
   */
  @Column({ length: 64, nullable: true })
  qq: string;

  /**
   * 邮箱地址
   */
  @Column({ length: 512, nullable: true })
  email: string;
}
