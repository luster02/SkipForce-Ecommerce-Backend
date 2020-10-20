import { Resolver, Args, Query, Int, Mutation } from '@nestjs/graphql'
import { User } from './user.entity'
import { UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { UserAuthGuard } from '../auth/guards/graph.guard'
import { MutationResult } from '../../graphql/interfaces'
import { UserDetailDto } from './dto/user.detail.dto'
import { CurrentUserGraph } from '../auth/decorators/user.decorator'
import { IJwtPayload } from '../auth/user/jwt-payload.interface'

@Resolver(of => User)
@UseGuards(UserAuthGuard)
export class UserResolver {
    constructor(private readonly _userService: UserService) { }

    @Query(returns => User)
    async user(@Args('id', { type: () => Int }) id: number): Promise<User> {
        return await this._userService.get(id)
    }

    @Query(returns => User)
    async currentUser(@CurrentUserGraph() user: IJwtPayload): Promise<User> {
        return await this._userService.get(user.id)
    }

    @Mutation(returns => MutationResult)
    async updateUser(
        @CurrentUserGraph() user: IJwtPayload,
        @Args('userData') userData: UserDetailDto
    ): Promise<MutationResult> {
        await this._userService.update(user.id, userData)
        return { success: true }
    }

    @Mutation(returns => MutationResult)
    async deleteUser(@Args('id', { type: () => Int }) id: number): Promise<MutationResult> {
        await this._userService.delete(id)
        return { success: true }
    }

}