import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDto } from '../../user/dto/user.dto';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUser = createParamDecorator(
  (data, req): UserDto => {
    return req.user;
  },
);

export const CurrentUserGraph = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  }
)