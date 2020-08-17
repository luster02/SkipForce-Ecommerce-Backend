import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectStripe } from 'nestjs-stripe'
import Stripe from 'stripe'
import { CartRepository } from './cart.repository';
import { ProductRepository } from '../product/product.repository';
import { Cart } from './cart.entity'
import { Product } from '../product/product.entity'

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(CartRepository)
        private readonly _cartRepository: CartRepository,
        @InjectRepository(ProductRepository)
        private readonly _productRepository: ProductRepository,
        @InjectStripe()
        private readonly stripeClient: Stripe
    ) { }

    async get(id: number): Promise<Cart> {
        if (!id) throw new BadRequestException('id must be sent');
        const cart: Cart = await this._cartRepository.findOne(id)
        if (!cart) throw new NotFoundException();
        return cart
    }

    async addProduct(idCart: number, idProduct: number) {
        if (!idCart) throw new BadRequestException('id must be sent');
        const cart: Cart = await this._cartRepository.findOne(idCart)
        if (!cart) throw new NotFoundException();
        const productToAdd: Product = await this._productRepository.findOne(idProduct)
        cart.products.push(productToAdd)
        cart.totlaPrice += productToAdd.price
        await this._cartRepository.save(cart)
    }

    async pullProduct(idCart: number, idProduct: number): Promise<void> {
        if (!idCart) throw new BadRequestException('id must be sent');
        const cart: Cart = await this._cartRepository.findOne(idCart)
        if (!cart) throw new NotFoundException();
        const productToRemove: Product = await this._productRepository.findOne(idProduct)
        cart.products = cart.products.filter(product => { product.id !== productToRemove.id })
        cart.totlaPrice -= productToRemove.price
        await this._cartRepository.save(cart)
    }

    async pay(id: number): Promise<Stripe.PaymentIntent> {
        if (!id) throw new BadRequestException('id must be sent');
        const cart: Cart = await this._cartRepository.findOne(id)
        if (!cart) throw new NotFoundException();
        const paymentIntent = await this.stripeClient.paymentIntents.create({
            amount: cart.totlaPrice, currency: 'mxn'
        })
        if (!paymentIntent) throw new NotFoundException();
        return paymentIntent
    }
}
