import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { getConnection, Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { SaleCustomer } from '../sale-customer/sale-customer.entity';

function jsonToSql(json) {
  const type = json.type;
  if (type === 'GROUP') {
    return handleGroup(json);
  } else if (type === 'RULE') {
    return handleRule(json);
  }
}

function handleGroup(group) {
  const list = [];
  group.children.forEach(child => {
    list.push(jsonToSql(child));
  });
  const where = list.join(` ${group.operator} `);
  return `( ${where} )`;
}

function handleRule(json) {
  const [attr, operator, value] = json.rule;
  let filterValue;

  if (typeof value === 'string') {
    filterValue = `'${value}'`;
  } else if (Array.isArray(value)) {
    filterValue = `(${value
      .map(text => {
        return `'${text}'`;
      })
      .join(',')})`;
  } else {
    filterValue = value;
  }

  return `${attr} ${operator} ${filterValue}`;
}

@Injectable()
export class CustomerService extends TypeOrmCrudService<Customer> {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(SaleCustomer)
    private readonly saleCustomerRepository: Repository<SaleCustomer>,
  ) {
    super(customerRepository);
  }

  async query(queryDto: any) {
    const sql = jsonToSql(queryDto);
    const connection = getConnection();
    return await connection.query(`SELECT * FROM customer where ${sql}`);
  }

  async remove(uuid: string) {
    this.saleCustomerRepository
      .createQueryBuilder()
      .delete()
      .from(SaleCustomer)
      .where('customer.uuid = :uuid', { uuid })
      .execute();

    return await this.customerRepository.delete(uuid);
  }
}
