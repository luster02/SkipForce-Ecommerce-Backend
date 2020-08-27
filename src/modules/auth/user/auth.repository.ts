import { genSalt, hash } from 'bcryptjs';
import { Repository, EntityRepository } from 'typeorm';
import { User } from '../../user/user.entity';
import { SignupDto } from '../dto';
import { UserDetails } from '../../user/user.details.entity';
import { Shop } from '../../shop/shop.entity'
import { Gallery } from '../../gallery/gallery.entity'

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async signup(signupDto: SignupDto) {
    const { username, email, password } = signupDto;
    const user = new User();
    user.username = username;
    user.email = email;
    
    const shop = new Shop()
    user.shop = shop;

    const gallery = new Gallery()
    user.gallery = gallery;


    const details = new UserDetails();
    user.details = details;

    const salt = await genSalt(10);
    user.password = await hash(password, salt);

    await user.save();
  }
}
