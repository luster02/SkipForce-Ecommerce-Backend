import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CustomerAuthService } from './customer.auth.service';
import { CustomerAuthController } from './customer.auth.controller';
import { CustomerAuthRepository } from './customer.auth.repository'
import { CustomerJwtStrategy } from './strategies/jwt.strategy'
import { ConfigService } from '../../../config/config.service';
import { ConfigModule } from '../../../config/config.module';
import { Configuration } from '../../../config/config.keys';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerAuthRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          secret: config.get(Configuration.JWT_SECRET_CUSTOMER),
          signOptions: {
            expiresIn: 3600,
          },
        };
      },
    }),
  ],
  controllers: [CustomerAuthController],
  providers: [CustomerAuthService, ConfigService, CustomerJwtStrategy],
  exports: [CustomerJwtStrategy, PassportModule]
})
export class CustomerAuthModule { }