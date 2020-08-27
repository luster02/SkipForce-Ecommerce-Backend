import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class UserAuthGuard extends AuthGuard('UserStrategy') { }

@Injectable()
export class CustomerAuthGuard extends AuthGuard('CustomerStrategy') { }