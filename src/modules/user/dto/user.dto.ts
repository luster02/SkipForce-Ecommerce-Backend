import { IsNotEmpty } from 'class-validator';
import { UserDetails } from '../user.details.entity';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserDto {
  @Field()
  @IsNotEmpty()
  id: number;

  @Field()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsNotEmpty()
  email: string;

  @Field() 
  @IsNotEmpty()
  details: UserDetails;
}
