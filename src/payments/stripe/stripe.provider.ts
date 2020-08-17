import { StripeModule } from 'nestjs-stripe';
import { ConfigModule } from '../../config/config.module'
import { ConfigService } from '../../config/config.service'
import { Configuration } from '../../config/config.keys'

export const StripeService = [
    StripeModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
            apiKey: configService.get(Configuration.STRIPE_KEY),
            apiVersion: "2020-03-02"
        })
    })
]