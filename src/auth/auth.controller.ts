import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { UsersService } from 'src/users/users.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    @ApiOperation({ summary: 'Get current authenticated user' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Returns authenticated user info' })
    async getMe(@Request() req: any) {
        const user = await this.usersService.findById(req.user.userId);
        if (!user) throw new NotFoundException('User not found');

        const { password, ...rest } = user.toObject()
        return rest;
    }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiBody({ type: RegisterDto })
    @ApiResponse({ status: 201, description: 'User registered successfully' })
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiOperation({ summary: 'Login with email and password' })
    @ApiBody({ type: LoginDto })
    @ApiResponse({ status: 200, description: 'Returns JWT token and user data' })
    async login(@Request() req: any) {
        return this.authService.login(req.user);
    }

    @Post('google')
    @ApiOperation({ summary: 'Login or register using a Google ID token' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                id_token: {
                    type: 'string',
                    example: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...',
                },
            },
            required: ['id_token'],
        },
    })
    @ApiResponse({ status: 200, description: 'Returns JWT token and user data from Google login' })
    async loginWithGoogle(@Body('id_token') idToken: string) {
        return this.authService.handleGoogleLogin(idToken);
    }
}
