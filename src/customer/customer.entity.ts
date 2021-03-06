import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  IsAscii,
  IsEmail,
  IsEnum,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';
import Utils from '../utils/utils';
import { SaleCustomer } from '../sale-customer/sale-customer.entity';

/**
 * 用户类型
 */
export enum CustomerType {
  /**
   * 普通会员
   */
  NORMAL = '',

  /**
   * VIP会员
   */
  VIP = 'vip',
}

/**
 * 用户等级
 */
export enum CustomerLevel {
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
  @IsNotEmpty()
  @Length(4, 256)
  @Matches(Utils.identifierRule, {
    message: Utils.errorMessage.isIdentifier('客户用户名'),
  })
  @Index('customer_name_index', { unique: true })
  @Column({ length: 256, nullable: false })
  name: string;

  /**
   * 昵称
   */
  @IsNotEmpty()
  @Length(2, 64)
  @Column({ length: 64, nullable: false })
  nickName: string;

  /**
   * 真实姓名
   */
  @IsOptional()
  @Length(0, 64)
  @Column({ length: 64, nullable: true })
  realName: string;

  /**
   * 类型
   */
  @IsOptional()
  @IsEnum(CustomerType)
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
  @IsOptional()
  @IsEnum(CustomerLevel)
  @Column({
    type: 'enum',
    enum: CustomerLevel,
    default: CustomerLevel.LEVEL_1,
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
  @IsOptional()
  @IsEnum(CustomerGender)
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
  @IsOptional()
  @IsISO8601()
  @Column({ type: 'datetime', nullable: true })
  birthday: string;

  /**
   * 城市
   */
  @IsOptional()
  @Length(0, 64)
  @Column({ length: 64, nullable: true })
  city: string;

  /**
   * 职业
   */
  @IsOptional()
  @Length(0, 64)
  @Column({ length: 64, nullable: true })
  occupation: string;

  /**
   * 年收入（元）
   */
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(2147483647)
  @Column({ type: 'int', nullable: true })
  annualIncome: number;

  /**
   * 学历
   */
  @IsOptional()
  @IsEnum(CustomerEducation)
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
  @IsOptional()
  @IsEnum(CustomerMaritalStatus)
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
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(127)
  @Column({ type: 'tinyint', nullable: true })
  numberOfChildren: number;

  /**
   * 手机号
   */
  @IsOptional()
  @IsPhoneNumber('CN', { message: Utils.errorMessage.isPhoneNumber('手机号') })
  @Column({ length: 64, nullable: true })
  phoneNumber: string;

  /**
   * 微信号
   */
  @IsOptional()
  @Length(0, 64)
  @Matches(Utils.identifierRule, {
    message: Utils.errorMessage.isIdentifier('微信号'),
  })
  @Column({ length: 64, nullable: true })
  weChat: string;

  /**
   * QQ号
   */
  @IsOptional()
  @Length(0, 64)
  @IsAscii({ message: Utils.errorMessage.isAscii('QQ号') })
  @Column({ length: 64, nullable: true })
  qq: string;

  /**
   * 邮箱地址
   */
  @IsOptional()
  @Length(0, 512)
  @IsEmail({}, { message: Utils.errorMessage.isEmail('邮箱地址') })
  @Column({ length: 512, nullable: true })
  email: string;

  @OneToMany(() => SaleCustomer, saleCustomer => saleCustomer.customer)
  public saleCustomers: SaleCustomer[];
}
