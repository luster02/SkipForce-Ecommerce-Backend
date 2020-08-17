import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql'
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { MutationResult } from '../../graphql/interfaces';
import { RoleDto } from './dto/role.dto';

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

    @Mutation(returns => MutationResult)
    async createRole(@Args('roleData') roleData: RoleDto): Promise<MutationResult> {
        await this._roleService.create(roleData)
        return { success: true }
    }

    @Mutation(returns => MutationResult)
    async updateRole(
        @Args('id', { type: () => Int }) id: number,
        @Args('roleData') roleData: RoleDto
    ): Promise<MutationResult> {
        await this._roleService.update(id, roleData)
        return { success: true }
    }

    @Mutation(returns => MutationResult)
    async deleteRole(@Args('id', { type: () => Int }) id: number): Promise<MutationResult> {
        await this._roleService.delete(id)
        return { success: true }
    }

}