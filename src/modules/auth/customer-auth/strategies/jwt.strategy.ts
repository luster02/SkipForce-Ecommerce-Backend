import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { CustomerAuthRepository } from '../customer.auth.repository';
import { IJwtPayload } from '../jwt-payload.interface';
import { ConfigService } from '../../../../config/config.service';
import { Configuration } from '../../../../config/config.keys';

@Injectable()
export class CustomerJwtStrategy extends PassportStrategy(Strategy, 'CustomerStrategy') {
  constructor(
    private readonly _configService: ConfigService,
    @InjectRepository(CustomerAuthRepository)
    private readonly _customerAuthRepository: CustomerAuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _configService.get(Configuration.JWT_SECRET),
    });
  }

  async validate(payload: IJwtPayload) {
    const { username } = payload;
    const user = await this._customerAuthRepository.findOne({ where: { username } });
    if (!user) throw new UnauthorizedException();
    return payload;
  }
}
