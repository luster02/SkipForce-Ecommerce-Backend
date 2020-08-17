import { Resolver, Args, Query, Int, Mutation } from '@nestjs/graphql'
import { User } from './user.entity'
import { UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { GqlAuthGuard } from '../auth/guards/graph.guard'
import { MutationResult } from '../../graphql/interfaces'
import { UserDetailDto } from './dto/user.detail.dto'

@Resolver(of => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
    constructor(private readonly _userService: UserService) { }

    @Query(returns => User)
    async user(@Args('id', { type: () => Int }) id: number): Promise<User> {
        return await this._userService.get(id)
    }

    @Query(returns => [User])
    async users(): Promise<User[]> {
        return await this._userService.getAll()
    }

    @Mutation(returns => MutationResult)
    async updateUser(
        @Args('id', { type: () => Int }) id: number,
        @Args('userData') userData: UserDetailDto
    ): Promise<MutationResult> {
        await this._userService.update(id, userData)
        return { success: true }
    }

    @Mutation(returns => MutationResult)
    async deleteUser(@Args('id', { type: () => Int }) id: number): Promise<MutationResult> {
        await this._userService.delete(id)
        return { success: true }
    }

}