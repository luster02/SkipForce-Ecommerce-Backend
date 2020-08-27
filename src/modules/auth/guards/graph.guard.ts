import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class UserAuthGuard extends AuthGuard('UserStrategy') {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context)
        return ctx.getContext().req
    }
}

@Injectable()
export class CustomerAuthGuard extends AuthGuard('CustomerStrategy') {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context)
        return ctx.getContext().req
    }
}