import { Resolver, Mutation, Args, } from '@nestjs/graphql'
import { User } from '../../user/user.entity'
import { AuthService } from './auth.service'
import { SigninDto, SignupDto } from '../dto'
import { MutationResult, UserResponse } from '../../../graphql/interfaces'

@Resolver(of => User)
export class AuthResolver {
    constructor(private readonly _authService: AuthService) { }

    @Mutation(returns => MutationResult)
    async signup(@Args('userData') userData: SignupDto): Promise<MutationResult> {
        await this._authService.signup(userData)
        return { success: true }
    }

    @Mutation(returns => UserResponse)
    async signin(@Args('userData') userData: SigninDto): Promise<UserResponse> {
        const { token } = await this._authService.signin(userData)
        return { token, success: true }
    }
}