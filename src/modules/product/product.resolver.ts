import { Resolver, Args, Query, Int, Mutation } from '@nestjs/graphql'
import { ProductService } from './product.service'
import { Product } from './product.entity'
import { ProductDto } from './dto/product.dto'
import { MutationResult } from '../../graphql/interfaces'

@Resolver(of => Product)
export class ProductResolver {
    constructor(private readonly _productService: ProductService) { }

    @Query(returns => Product)
    async getProduct(
        @Args('id', { type: () => Int }) id: number
    ): Promise<Product> {
        return await this._productService.get(id)
    }

    @Query(returns => [Product])
    async getAllProducts(
        @Args('id', { type: () => Int }) id: number
    ): Promise<Product[]> {
        return await this._productService.getAll(id)
    }

    @Mutation(returns => MutationResult)
    async createProduct(
        @Args('id', { type: () => Int }) id: number,
        @Args('productData') productData: ProductDto
    ): Promise<MutationResult> {
        this._productService.create(id, productData)
        return { success: true }
    }

    @Mutation(returns => MutationResult)
    async editProduct(
        @Args('id', { type: () => Int }) id: number,
        @Args('productData') productData: ProductDto
    ): Promise<MutationResult> {
        await this._productService.update(id, productData)
        return { success: true }
    }

    @Mutation(returns => MutationResult)
    async pushAssets(
        @Args('id', { type: () => Int }) id: number,
        @Args('assets', { type: () => [Int] }) assets: number[]
    ): Promise<MutationResult> {
        await this._productService.pushAssets(id, assets)
        return { success: true }
    }

    @Mutation(returns => MutationResult)
    async pullAssets(
        @Args('id', { type: () => Int }) id: number,
        @Args('assets', { type: () => [Int] }) assets: number[]
    ): Promise<MutationResult> {
        await this._productService.pullAssets(id, assets)
        return { success: true }
    }

    @Mutation(returns => MutationResult)
    async deleteProduct(
        @Args('id', { type: () => Int }) id: number
    ): Promise<MutationResult> {
        await this._productService.delete(id)
        return { success: true }
    }

}