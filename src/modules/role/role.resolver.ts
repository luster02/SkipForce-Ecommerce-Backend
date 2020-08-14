import {
    Resolver, Mutation, Args,
    Query, ResolveField, Parent, Int
} from '@nestjs/graphql'
import { Role } from './role.entity';
import { RoleService } from './role.service';

@Resolver()
export class RoleResolver {
    constructor(private readonly _roleService: RoleService) { }

    @Query(returns => Role)
    async role(@Args('id', { type: () => Int }) id: number): Promise<Role> {
        return await this._roleService.get(id)
    }

    @Query(returns => [Role])
    async roles(): Promise<Role[]> {
        return await this._roleService.getAll()
    }
}