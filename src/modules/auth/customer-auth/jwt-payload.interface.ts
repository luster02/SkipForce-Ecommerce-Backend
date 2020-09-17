export interface IJwtPayload {
    id: number;
    username: string;
    email: string;
    roles: string[]
    iat?: Date;
}