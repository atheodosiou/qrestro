import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UserDocument } from 'src/users/users.schema';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {

    private client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

    async handleGoogleLogin(idToken: string) {
        const ticket = await this.client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload) throw new UnauthorizedException('Invalid Google token');

        const { sub: googleId, email, name, picture } = payload;

        if (!googleId || !email || !name || !picture) {
            throw new UnauthorizedException('Missing required Google account information');
        }

        let user = await this.usersService.findByGoogleId(googleId);
        if (!user) {
            // Create user
            user = await this.usersService.createWithGoogle({
                googleId,
                email,
                name,
                picture,
            });
        }

        const token = this.jwtService.sign({ sub: user._id, email: user.email, role: user.role });

        return {
            access_token: token
        };
    }
}
