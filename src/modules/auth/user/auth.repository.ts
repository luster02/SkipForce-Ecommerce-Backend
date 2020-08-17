import { genSalt, hash } from 'bcryptjs';
import { Repository, EntityRepository, getConnection } from 'typeorm';
import { User } from '../../user/user.entity';
import { SignupDto } from '../dto';
import { RoleRepository } from '../../role/role.repository';
import { Role } from '../../role/role.entity';
import { RoleType } from '../../role/roletype.enum';
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

    const roleRepository: RoleRepository = await getConnection().getRepository(
      Role,
    );

    const defaultRole: Role = await roleRepository.findOne({
      where: { name: RoleType.GENERAL },
    });

    user.roles = [defaultRole];

    const details = new UserDetails();
    user.details = details;

    const shop = new Shop()
    user.shop = shop

    const gallery = new Gallery()
    user.gallery = gallery

    const salt = await genSalt(10);
    user.password = await hash(password, salt);

    await user.save();
  }
}
