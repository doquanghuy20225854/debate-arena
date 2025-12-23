import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    console.log('AuthService.register called for', dto.username, dto.email);
    const existing = await this.usersRepository.findOne({ where: [{ username: dto.username }, { email: dto.email }] });
    if (existing) {
      if (existing.username === dto.username) throw new ConflictException('Username already taken');
      throw new ConflictException('Email already in use');
    }
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepository.create({ username: dto.username, email: dto.email, password: hashed });
    try {
      const saved = await this.usersRepository.save(user);
      const { password, ...rest } = saved as any;
      return rest as Partial<User>;
    } catch (err) {
      console.error('AuthService.register error:', err);
      throw new InternalServerErrorException('Could not create user');
    }
  }

  async validateUserByEmail(email: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) return null;
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) return null;
    const { password: pwd, ...rest } = user as any;
    return rest as Partial<User>;
  }

  async login(dto: LoginDto) {
    const user = await this.usersRepository.findOne({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    const payload = { sub: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken, user: { id: user.id, username: user.username, email: user.email } };
  }
}
