import { Resolver, Args, Query, Int, Mutation } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { BannerService } from './banner.service'
import { Banner } from './banner.entity'
import { BannerDto } from './dto/banner.dto'
import { MutationResult } from '../../graphql/interfaces/result.interface'
import { UserAuthGuard } from '../auth/guards/graph.guard'

@Resolver(of => Banner)
export class BannerResolver {
    constructor(private readonly _bannerService: BannerService) { }

    @Query(returns => Banner)
    async getBanner(
        @Args('id', { type: () => Int }) id: number
    ): Promise<Banner> {
        return await this._bannerService.get(id)
    }

    @Query(returns => [Banner])
    async getAllBanners(): Promise<Banner[]> {
        return await this._bannerService.getAll()
    }

    @UseGuards(UserAuthGuard)
    @Mutation(returns => MutationResult)
    async createBanner(
        @Args('bannerData') bannerData: BannerDto
    ): Promise<MutationResult> {
        await this._bannerService.create(bannerData)
        return { success: true }
    }

    @UseGuards(UserAuthGuard)
    @Mutation(returns => MutationResult)
    async updateBanner(
        @Args('id', { type: () => Int }) id: number,
        @Args('bannerData') bannerData: BannerDto
    ): Promise<MutationResult> {
        await this._bannerService.update(id, bannerData)
        return { success: true }
    }

    @UseGuards(UserAuthGuard)
    @Mutation(returns => MutationResult)
    async addAsset(
        @Args('id', { type: () => Int }) id: number,
        @Args('asset') asset: number
    ): Promise<MutationResult> {
        await this._bannerService.addAsset(id, asset)
        return { success: true }
    }

    @UseGuards(UserAuthGuard)
    @Mutation(returns => MutationResult)
    async removeAsset(
        @Args('id', { type: () => Int }) id: number
    ): Promise<MutationResult> {
        await this._bannerService.removeAsset(id)
        return { success: true }
    }

    @UseGuards(UserAuthGuard)
    @Mutation(returns => MutationResult)
    async deleteBanner(
        @Args('id', { type: () => Int }) id: number
    ): Promise<MutationResult> {
        await this._bannerService.delete(id)
        return { success: true }
    }

} 