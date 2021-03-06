import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { AuthRepository } from './auth.repository';
import { SignupDto, SigninDto } from '../dto';
import { User } from '../../user/user.entity';
import { IJwtPayload } from './jwt-payload.interface';
import { RoleType } from '../../../shared/roletype.enum'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
    private readonly _jwtService: JwtService,
  ) { }

  async signup(signupDto: SignupDto): Promise<void> {
    const { username, email } = signupDto;
    const userExists = await this._authRepository.findOne({ where: [{ username }, { email }] });
    if (userExists) throw new ConflictException('username or email already exists');
    const length = await this._authRepository.count()
    if (length > 0) throw new InternalServerErrorException('you are already registered, log in')
    return this._authRepository.signup(signupDto);
  }

  async signin(signinDto: SigninDto): Promise<{ token: string }> {
    const { username, password } = signinDto;
    const user: User = await this._authRepository.findOne({ where: { username } });
    if (!user) throw new NotFoundException('user does not exist');
    const isMatch = await compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('invalid credentials');

    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      roles: [RoleType.ADMIN]
    };

    const token = await this._jwtService.sign(payload);

    return { token };
  }
}
