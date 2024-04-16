import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { UserEntity } from 'src/entities/user.entity';
import { TokenTypes } from 'src/types/token.types';
import { ProfileEntity } from 'src/entities';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from './dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private usersService: UsersService,
  ) {}

  async register(registerInput: RegisterDto): Promise<TokenTypes> {
    const { email, fullname, password } = registerInput;

    const existingUser = await this.usersService.getUserByEmail(email);
    if (existingUser) {
      throw new NotFoundException('User with this email already exists');
    }

    const hashedPassword = await argon2.hash(password);

    const profile = new ProfileEntity();
    profile.fullname = fullname;
    await this.profileRepository.save(profile);

    const user = new UserEntity();
    user.email = email;
    user.password = hashedPassword;
    user.profile = profile;

    await this.userRepository.save(user);
    const tokens = await this.generateTokens(user);

    return tokens;
  }

  async login(loginInput: LoginDto): Promise<TokenTypes> {
    const { email, password } = loginInput;

    const existUser = await this.usersService.getUserByEmail(email);

    if (!existUser) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const passwordMatch = await argon2.verify(existUser.password, password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const tokens = await this.generateTokens(existUser);

    return tokens;
  }

  async refresh(refreshToken: string): Promise<TokenTypes> {
    if (!refreshToken) throw new UnauthorizedException();

    const result = await this.jwtService.verifyAsync(refreshToken);

    const user = await this.userRepository.findOne({
      where: {
        id: result.id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tokens = await this.generateTokens(user);
    return tokens;
  }

  async generateTokens(user: UserEntity): Promise<TokenTypes> {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });

    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      accessToken,
      refreshToken,
    };
  }
}
