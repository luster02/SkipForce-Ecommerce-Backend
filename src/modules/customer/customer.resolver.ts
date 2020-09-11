import { Resolver, Args, Query, Int, Mutation } from '@nestjs/graphql'
import { CustomerService } from './customer.service'
import { Customer } from './customer.entity'
import { CustomerDetailDto } from './dto/customer.detail.dto'
import { MutationResult } from '../../graphql/interfaces'
import { UseGuards } from '@nestjs/common'
import { CustomerAuthGuard } from '../auth/guards/graph.guard'
import { CurrentUserGraph } from '../auth/decorators/user.decorator'
import { IJwtPayload } from '../auth/customer-auth/jwt-payload.interface'

@UseGuards(CustomerAuthGuard)
@Resolver(of => Customer)
export class CustomerResolver {
    constructor(private readonly _customerService: CustomerService) { }

    @Query(returns => Customer)
    async getCustomer(
        @Args('id', { type: () => Int }) id: number
    ): Promise<Customer> {
        return await this._customerService.get(id)
    }

    @Query(returns => Customer)
    async currentCustomer(
        @CurrentUserGraph() customer: IJwtPayload
    ): Promise<Customer> {
        return await this._customerService.get(customer.id)
    }

    @Query(returns => [Customer])
    async getAllCustomers(): Promise<Customer[]> {
        return await this._customerService.getAll()
    }

    @Mutation(returns => MutationResult)
    async editCustomer(
        @Args('id', { type: () => Int }) id: number,
        @Args('customerData') customerData: CustomerDetailDto
    ): Promise<MutationResult> {
        await this._customerService.update(id, customerData)
        return { success: true }
    }

    @Mutation(returns => MutationResult)
    async deleteCustomer(
        @Args('id', { type: () => Int }) id: number
    ): Promise<MutationResult> {
        await this._customerService.delete(id)
        return { success: true }
    }

}