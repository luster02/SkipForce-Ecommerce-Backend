import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignupDto, SigninDto } from '../dto';
import { CustomerAuthService } from './customer.auth.service';

@ApiTags('customer-auth')
@Controller('customer-auth')
export class CustomerAuthController {
  constructor(private readonly _authService: CustomerAuthService) { }

  @Post('/signup')
  @UsePipes(ValidationPipe)
  async signup(@Body() signupDto: SignupDto): Promise<void> {
    return this._authService.signup(signupDto);
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  async signin(@Body() signinDto: SigninDto) {
    return this._authService.signin(signinDto);
  }
}
