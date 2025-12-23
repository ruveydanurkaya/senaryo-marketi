import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: any): Promise<import("../entities/user.entity").User[]>;
    login(body: any): Promise<{
        access_token: string;
        role: import("../entities/user.entity").UserRole;
    }>;
}
