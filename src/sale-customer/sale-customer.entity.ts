import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Sale } from '../task/sale/sale.entity';
import { Customer } from '../customer/customer.entity';

@Entity()
export class SaleCustomer {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => Sale, sale => sale.saleCustomers)
  public sale: Sale;

  @ManyToOne(() => Customer, sale => sale.saleCustomers)
  public customer: Customer;

  @Column({ type: 'boolean', default: false, nullable: false })
  finished: boolean;
}
