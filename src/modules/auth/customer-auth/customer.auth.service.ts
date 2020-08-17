import {
    Injectable,
    ConflictException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { CustomerAuthRepository } from './customer.auth.repository';
import { SignupDto, SigninDto } from '../dto';
import { Customer } from '../../customer/customer.entity';
import { IJwtPayload } from './jwt-payload.interface';


@Injectable()
export class CustomerAuthService {
    constructor(
        @InjectRepository(CustomerAuthRepository)
        private readonly _customerAuthRepository: CustomerAuthRepository,
        private readonly _jwtService: JwtService,
    ) { }

    async signup(signupDto: SignupDto): Promise<void> {
        const { username, email } = signupDto;
        const userExists = await this._customerAuthRepository.findOne({ where: [{ username }, { email }] });
        if (userExists) throw new ConflictException('username or email already exists');
        return this._customerAuthRepository.signup(signupDto);
    }

    async signin(signinDto: SigninDto): Promise<{ token: string }> {
        const { username, password } = signinDto;
        const customer: Customer = await this._customerAuthRepository.findOne({ where: { username } });
        if (!customer) throw new NotFoundException('customer does not exist');
        const isMatch = await compare(password, customer.password);
        if (!isMatch) throw new UnauthorizedException('invalid credentials');

        const payload: IJwtPayload = {
            id: customer.id,
            email: customer.email,
            username: customer.username,
        };

        const token = await this._jwtService.sign(payload);

        return { token };
    }
}
