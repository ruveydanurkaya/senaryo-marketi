import { User } from './user.entity';
import { Genre } from './genre.entity';
export declare class Script {
    id: number;
    title: string;
    content: string;
    price: number;
    writer: User;
    genres: Genre[];
}
