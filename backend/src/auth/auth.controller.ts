import { Controller, Post, Body, Res, UnauthorizedException, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: any) {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const { accessToken, refreshToken, user: userData } = await this.authService.login(user);

        this.setCookies(res, accessToken, refreshToken);

        return { user: userData };
    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto, @Res({ passthrough: true }) res: any) {
        const { accessToken, refreshToken, user } = await this.authService.register(
            registerDto.email,
            registerDto.password,
            registerDto.name,
        );

        this.setCookies(res, accessToken, refreshToken);

        return { user };
    }

    @Get('seed-admin')
    async seedAdmin() {
        return this.authService.seedAdmin();
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) res: any) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        return { message: 'Logged out' };
    }

    private setCookies(res: any, accessToken: string, refreshToken: string) {
        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000, // 15m
        });
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
        });
    }
}
