import { Resolver, Args, Query, Int, Mutation } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { AddressService } from './address.service'
import { Address } from './address.entity'
import { AddressDto } from './dto/address.dto'
import { MutationResult } from '../../graphql/interfaces'
import { GqlAuthGuard } from '../auth/guards/graph.guard'

@UseGuards(GqlAuthGuard)
@Resolver(of => Address)
export class AddressResolver {
    constructor(private readonly _addressService: AddressService) { }

    @Query(returns => Address)
    async getAddress(
        @Args('id', { type: () => Int }) id: number
    ): Promise<Address> {
        return await this._addressService.get(id)
    }

    @Mutation(returns => MutationResult)
    async updateAddress(
        @Args('id', { type: () => Int }) id: number,
        @Args('addresData') addressData: AddressDto
    ): Promise<MutationResult> {
        await this._addressService.update(id, addressData)
        return { success: true }
    }

}