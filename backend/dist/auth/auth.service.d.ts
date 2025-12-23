import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class AuthService {
    private usersRepo;
    private jwtService;
    constructor(usersRepo: Repository<User>, jwtService: JwtService);
    register(userData: any): Promise<User[]>;
    login(userDto: any): Promise<{
        access_token: string;
        role: import("../entities/user.entity").UserRole;
    }>;
}
