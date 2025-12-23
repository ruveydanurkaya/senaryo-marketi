import { Script } from './script.entity';
import { Order } from './order.entity';
export declare enum UserRole {
    WRITER = "writer",
    DIRECTOR = "director",
    ADMIN = "admin"
}
export declare class User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: UserRole;
    scripts: Script[];
    orders: Order[];
}
