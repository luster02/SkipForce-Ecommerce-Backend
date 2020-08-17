import { Module } from '@nestjs/common';
import { StripeService } from './stripe.provider'

@Module({
    imports: [...StripeService],
    exports: [...StripeService]
})
export class StripeModule {}
