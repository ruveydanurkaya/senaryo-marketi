import { User } from './user.entity';
import { Script } from './script.entity';
export declare class Order {
    id: number;
    purchaseDate: Date;
    buyer: User;
    script: Script;
}
