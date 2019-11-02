import { Entity, OneToMany } from 'typeorm';
import { Task } from '../task.entity';
import { SaleCustomer } from '../../sale-customer/sale-customer.entity';

/**
 * 销售
 */
@Entity()
export class Sale extends Task {
  @OneToMany(() => SaleCustomer, saleCustomer => saleCustomer.sale)
  public saleCustomers: SaleCustomer[];
}
