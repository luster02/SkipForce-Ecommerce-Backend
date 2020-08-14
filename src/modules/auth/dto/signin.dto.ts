import { IsNotEmpty, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class SigninDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  username: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  password: string;
}
