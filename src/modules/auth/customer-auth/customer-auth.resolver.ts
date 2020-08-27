import { Resolver, Mutation, Args, } from '@nestjs/graphql'
import { Customer } from '../../customer/customer.entity'
import { CustomerAuthService } from './customer.auth.service'
import { SigninDto, SignupDto } from '../dto'
import { MutationResult, UserResponse } from '../../../graphql/interfaces'

@Resolver(of => Customer)
export class CustomerAuthResolver {
    constructor(private readonly _authService: CustomerAuthService) { }

    @Mutation(returns => MutationResult)
    async signupCustomer(
        @Args('userData') userData: SignupDto
    ): Promise<MutationResult> {
        await this._authService.signup(userData);
        return { success: true }
    }

    @Mutation(returns => UserResponse)
    async signinCustomer(
        @Args('userData') userData: SigninDto
    ): Promise<UserResponse> {
        const { token } = await this._authService.signin(userData);
        return { token, success: true }
    }

}