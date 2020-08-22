import { Resolver, Args, Query, Int, Mutation } from '@nestjs/graphql'
import { OrderService } from './order.service'
import { Order } from './order.entity'
import { MutationResult } from '../../graphql/interfaces'
import { GqlAuthGuard } from '../auth/guards/graph.guard'
import { UseGuards } from '@nestjs/common'

@UseGuards(GqlAuthGuard)
@Resolver(of => Order)
export class OrderResolver {
    constructor(private readonly _orderService: OrderService) { }

    @Query(returns => Order)
    async getOrder(
        @Args('id', { type: () => Int }) id: number
    ): Promise<Order> {
        return await this._orderService.get(id)
    }

    @Query(returns => [Order])
    async getAll(): Promise<Order[]> {
        return await this._orderService.getAll()
    }

    @Mutation(returns => MutationResult)
    async createOrder(
        @Args('id', { type: () => Int }) id: number
    ): Promise<MutationResult> {
        await this._orderService.create(id)
        return { success: true }
    }

    @Mutation(returns => MutationResult)
    async updateStatus(
        @Args('id', { type: () => Int }) id: number,
        @Args('status') status: string
    ): Promise<MutationResult> {
        await this._orderService.update(id, status)
        return { success: true }
    }

}