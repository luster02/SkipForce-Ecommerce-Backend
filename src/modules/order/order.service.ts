import { Injectable, BadRequestException, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { Order } from './order.entity';
import { CartService } from '../cart/cart.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderRepository)
        private readonly _orderRepository: OrderRepository,
        @Inject(CartService)
        private readonly _cartService: CartService
    ) { }

    async get(id: number): Promise<Order> {
        if (!id) throw new BadRequestException('id must be sent');
        const order: Order = await this._orderRepository.findOne(id)
        if (!order) throw new NotFoundException();
        return order
    }

    async getAll(): Promise<Order[]> {
        const orders: Order[] = await this._orderRepository.find()
        if (!orders) throw new NotFoundException();
        return orders
    }

    async create(id: number): Promise<void> {
        const cart = await this._cartService.get(id)
        let order: Order = new Order()
        order.products = cart.products
        order.customer = cart.customer
        order.totlaPrice = cart.totlaPrice
        order.address = cart.customer.address
        await order.save()
        cart.products = []
        cart.totlaPrice = 0
        await cart.save()
    }

    async update(id: number, status: string): Promise<void> {
        if (!id) throw new BadRequestException('id must be sent');
        const order: Order = await this._orderRepository.findOne(id)
        if (!order) throw new NotFoundException();
        await this._orderRepository.update(id, { ...order, status })
    }
}
