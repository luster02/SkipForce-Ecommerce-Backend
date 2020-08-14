import { Resolver, Args, Query, Int } from '@nestjs/graphql'
import { User } from './user.entity'
import { UserService } from './user.service'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/guards/graph.guard'

@Resolver(of => User)
export class UserResolver {
    constructor(private readonly _userService: UserService) { }

    @Query(returns => User)
    async user(@Args('id', { type: () => Int }) id: number): Promise<User> {
        return await this._userService.get(id)
    }

    @UseGuards(GqlAuthGuard)
    @Query(returns => [User])
    async users(): Promise<User[]> {
        return await this._userService.getAll()
    }
}