import { genSalt, hash } from 'bcryptjs';
import { Repository, EntityRepository } from 'typeorm';
import { Customer } from '../../customer/customer.entity';
import { SignupDto } from '../dto';
import { CustomerDetail } from '../../customer/customer.detail.entity';
import { Cart } from '../../cart/cart.entity'
import { Address } from '../../address/address.entity'

@EntityRepository(Customer)
export class CustomerAuthRepository extends Repository<Customer> {
    async signup(signupDto: SignupDto) {
        const { username, email, password } = signupDto;
        const customer = new Customer();
        customer.username = username;
        customer.email = email;

        const details = new CustomerDetail();
        customer.details = details;

        const address = new Address()
        customer.address = address

        const cart = new Cart()
        customer.cart = cart

        const salt = await genSalt(10);
        customer.password = await hash(password, salt);

        await customer.save();
    }
}
