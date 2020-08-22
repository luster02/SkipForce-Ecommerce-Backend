import { Resolver, Args, Query, Int, Mutation } from '@nestjs/graphql'
import { GalleryService } from './gallery.service'
import { Gallery } from './gallery.entity'
import { GalleryDto } from './dto/gallery.dto'
import { MutationResult } from '../../graphql/interfaces'
import { GqlAuthGuard } from '../auth/guards/graph.guard'
import { UseGuards } from '@nestjs/common'

@UseGuards(GqlAuthGuard)
@Resolver(of => Gallery)
export class GalleryResolver {
    constructor(private readonly _galleryService: GalleryService) { }

    @Query(returns => Gallery)
    async getOneGallery(
        @Args('id', { type: () => Int }) id: number
    ): Promise<Gallery> {
        return await this._galleryService.get(id)
    }

    @Mutation(returns => MutationResult)
    async deleteGallery(
        @Args('id', { type: () => Int }) id: number
    ): Promise<MutationResult> {
        await this._galleryService.delete(id)
        return { success: true }
    }

    @Mutation(returns => MutationResult)
    async createFoler(
        @Args('id', { type: () => Int }) id: number,
        @Args('galleryData') gallerData: GalleryDto
    ): Promise<MutationResult> {
        await this._galleryService.createFoler(id, gallerData)
        return { success: true }
    }

}