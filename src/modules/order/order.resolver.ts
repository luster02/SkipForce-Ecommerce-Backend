import { Resolver, Args, Query, Int, Mutation } from '@nestjs/graphql'
import { OrderService } from './order.service'
import { Order } from './order.entity'
import { MutationResult } from '../../graphql/interfaces'
import { UserAuthGuard, CustomerAuthGuard } from '../auth/guards/graph.guard'
import { UseGuards } from '@nestjs/common'

@Resolver(of => Order)
export class OrderResolver {
    constructor(private readonly _orderService: OrderService) { }

    @UseGuards(CustomerAuthGuard)
    @Query(returns => Order)
    async getOrder(
        @Args('id', { type: () => Int }) id: number
    ): Promise<Order> {
        return await this._orderService.get(id)
    }

    @UseGuards(CustomerAuthGuard)
    @Query(returns => [Order])
    async getAllOrders(): Promise<Order[]> {
        return await this._orderService.getAll()
    }

    @UseGuards(UserAuthGuard)
    @Query(returns => Order)
    async getOrderFromAdmin(
        @Args('id', { type: () => Int }) id: number
    ): Promise<Order> {
        return await this._orderService.get(id)
    }

    @UseGuards(UserAuthGuard)
    @Query(returns => [Order])
    async getAllOrdersFromAdmin(): Promise<Order[]> {
        return await this._orderService.getAll()
    }

    @UseGuards(CustomerAuthGuard)
    @Mutation(returns => MutationResult)
    async createOrder(
        @Args('id', { type: () => Int }) id: number
    ): Promise<MutationResult> {
        await this._orderService.create(id)
        return { success: true }
    }

    @UseGuards(UserAuthGuard)
    @Mutation(returns => MutationResult)
    async updateOrderStatus(
        @Args('id', { type: () => Int }) id: number,
        @Args('status') status: string
    ): Promise<MutationResult> {
        await this._orderService.update(id, status)
        return { success: true }
    }

}