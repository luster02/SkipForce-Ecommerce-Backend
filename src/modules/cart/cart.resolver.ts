import { Resolver, Args, Query, Int, Mutation } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { CartService } from './cart.service'
import { Cart } from './cart.entity'
import { MutationResult, CartResponse } from '../../graphql/interfaces'
import { GqlAuthGuard } from '../auth/guards/graph.guard'

@UseGuards(GqlAuthGuard)
@Resolver(of => Cart)
export class CartResolver {
    constructor(private readonly _cartService: CartService) { }

    @Query(returns => Cart)
    async getCart(
        @Args('id', { type: () => Int }) id: number
    ): Promise<Cart> {
        return await this._cartService.get(id)
    }

    @Mutation(returns => MutationResult)
    async addProduct(
        @Args('id', { type: () => Int }) id: number,
        @Args('productId', { type: () => Int }) productId: number
    ): Promise<MutationResult> {
        await this._cartService.addProduct(id, productId)
        return { success: true }
    }

    @Mutation(returns => MutationResult)
    async pullProduct(
        @Args('id', { type: () => Int }) id: number,
        @Args('productId', { type: () => Int }) productId: number
    ): Promise<MutationResult> {
        await this._cartService.pullProduct(id, productId)
        return { success: true }
    }

    @Mutation(returns => MutationResult)
    async payCart(
        @Args('id', { type: () => Int }) id: number
    ): Promise<CartResponse> {
        const { client_secret } = await this._cartService.pay(id)
        return { success: true, client_secret }
    }

}