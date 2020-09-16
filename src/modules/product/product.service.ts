import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Between } from 'typeorm'
import { ProductRepository } from './product.repository';
import { Product } from './product.entity';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductRepository)
        private readonly _productRepository: ProductRepository
    ) { }

    async get(id: number): Promise<Product> {
        if (!id) throw new BadRequestException('id must be sent');
        const product: Product = await this._productRepository.findOne(id)
        if (!product) throw new NotFoundException();
        return product
    }

    async getAll(): Promise<Product[]> {
        const products: Product[] = await this._productRepository.find()
        if (!products) throw new NotFoundException();
        return products
    }

    async getByName(name: string): Promise<Product[]> {
        const products: Product[] = await this._productRepository.find({ name: Like(`%${name}%`) })
        if (!products) throw new NotFoundException();
        return products
    }

    async getByDescription(description: string): Promise<Product[]> {
        const products: Product[] = await this._productRepository.find({ description: Like(`%${description}%`) })
        if (!products) throw new NotFoundException();
        return products
    }

    async getByCategory(category: string): Promise<Product[]> {
        const products: Product[] = await this._productRepository.find({ category: category })
        if (!products) throw new NotFoundException();
        return products
    }

    async getByPriceRange(rangeA: number, rangeB: number): Promise<Product[]> {
        const products: Product[] = await this._productRepository.find({ price: Between(rangeA, rangeB) })
        if (!products) throw new NotFoundException();
        return products
    }

    async create(id: number, productData: ProductDto): Promise<Product> {
        if (!id) throw new BadRequestException('product id must be sent');
        productData.shop = id;
        const product: Product = await this._productRepository.save(productData)
        if (!product) throw new NotFoundException();
        return product
    }

    async update(id: number, productData: ProductDto): Promise<void> {
        if (!id) throw new BadRequestException('product id must be sent');
        const product: Product = await this._productRepository.findOne(id)
        if (!product) throw new NotFoundException();
        await this._productRepository.update(id, productData)
    }

    async pushAssets(id: number, assets: number[]): Promise<void> {
        if (!id) throw new BadRequestException('product id must be sent');
        const product: any = await this._productRepository.findOne(id)
        if (!product) throw new NotFoundException();
        assets.forEach(async (asset: number) => {
            if (!product.assets.includes(asset)) {
                await this._productRepository.createQueryBuilder()
                    .relation(Product, 'assets').of(product).add(asset)
            }
        })
    }

    async pullAssets(id: number, assets: any): Promise<void> {
        if (!id) throw new BadRequestException('product id must be sent');
        const product: Product = await this._productRepository.findOne(id)
        if (!product) throw new NotFoundException();
        assets.forEach((assetToRemove) => {
            product.assets = product.assets.filter(asset => {
                asset.id !== assetToRemove.id
            })
        })
        await this._productRepository.save(product)
    }

    async delete(id: number): Promise<void> {
        if (!id) throw new BadRequestException('product id must be sent');
        const productExist = await this._productRepository.findOne(id)
        if (!productExist) throw new NotFoundException();
        await this._productRepository.delete(id)
    }
}
