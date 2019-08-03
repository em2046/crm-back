import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  Length,
  IsInt,
  Min,
  Max,
  IsPhoneNumber,
  IsEmail,
} from 'class-validator';
import {
  CustomerEducation,
  CustomerGender,
  CustomerLevel,
  CustomerMaritalStatus,
  CustomerType,
} from '../customer.entity';

export class CreateCustomerDto {
  @IsNotEmpty()
  @Length(0, 64)
  readonly nickName: string;

  @IsOptional()
  @Length(0, 64)
  readonly realName: string;

  @IsOptional()
  @IsEnum(CustomerType)
  readonly type: CustomerType;

  @IsOptional()
  @IsEnum(CustomerLevel)
  readonly level: CustomerLevel;

  @IsOptional()
  @IsEnum(CustomerGender)
  readonly gender: CustomerGender;

  @IsOptional()
  @IsISO8601()
  birthday: string;

  @IsOptional()
  @Length(0, 64)
  city: string;

  @IsOptional()
  @Length(0, 64)
  occupation: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(2147483647)
  annualIncome: number;

  @IsOptional()
  @IsEnum(CustomerEducation)
  education: CustomerEducation;

  @IsOptional()
  @IsEnum(CustomerMaritalStatus)
  maritalStatus: CustomerMaritalStatus;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(127)
  numberOfChildren: number;

  @IsOptional()
  @IsPhoneNumber('CN')
  phoneNumber: string;

  @IsOptional()
  @Length(0, 64)
  weChat: string;

  @IsOptional()
  @Length(0, 64)
  qq: string;

  @IsOptional()
  @Length(0, 512)
  @IsEmail()
  email: string;
}
