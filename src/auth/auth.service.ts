import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UserDocument } from 'src/users/users.schema';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.usersService.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

    async login(user: UserDocument) {
        const payload = { sub: user._id, email: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(data: { email: string; password: string; name?: string }) {
        const existing = await this.usersService.findByEmail(data.email);
        if (existing) throw new UnauthorizedException('Email already in use');

        const hashed = await bcrypt.hash(data.password, 10);
        const user = await this.usersService.create({
            email: data.email,
            password: hashed,
            name: data.name,
        });

        return { message: 'Registration successful' };
    }
}
