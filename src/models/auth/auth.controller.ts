import { AuthService } from './auth.service';
import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Response, Request } from 'express';
import { LoginDto, RegisterDto } from './dtos/auth.dto';
import { TokenTypes } from 'src/types/token.types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async register(
    @Body() userDto: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Pick<TokenTypes, 'accessToken'>> {
    const { accessToken, refreshToken } =
      await this.authService.register(userDto);

    response.cookie('refresh_token', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      // secure: true, => if you use https
    });

    return { accessToken };
  }

  @Post('signin')
  async login(
    @Body() userDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Pick<TokenTypes, 'accessToken'>> {
    const { accessToken, refreshToken } = await this.authService.login(userDto);

    response.cookie('refresh_token', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      // secure: true, => if you use https
    });

    return { accessToken };
  }

  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Pick<TokenTypes, 'accessToken'>> {
    const { refresh_token } = request.cookies;

    console.log(refresh_token);

    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refresh(refresh_token);

    response.cookie('refresh_token', newRefreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      // secure: true, => if you use https
    });

    return { accessToken };
  }

  @UseGuards(JwtAuthGuard)
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('refresh_token');

    return true;
  }
}
