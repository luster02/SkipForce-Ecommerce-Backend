export interface IJwtPayload {
  id: number;
  username: string;
  email: string;
  iat?: Date;
}
