import { Test, TestingModule } from '@nestjs/testing';
import { CustomerAuthController } from '../customer.auth.controller';

describe('CustomerAuth Controller', () => {
  let controller: CustomerAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerAuthController],
    }).compile();

    controller = module.get<CustomerAuthController>(CustomerAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
