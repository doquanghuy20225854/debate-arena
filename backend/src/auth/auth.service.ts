import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
	) {}

	async register(dto: RegisterDto) {
		console.log('AuthService.register called for', dto.username, dto.email);
		// Check duplicates by username or email
		const existing = await this.usersRepository.findOne({
			where: [{ username: dto.username }, { email: dto.email }],
		});

		if (existing) {
			if (existing.username === dto.username) {
				throw new ConflictException('Username already taken');
			}
			throw new ConflictException('Email already in use');
		}

		const saltRounds = 10;
		const hashed = await bcrypt.hash(dto.password, saltRounds);

		const user = this.usersRepository.create({
			username: dto.username,
			email: dto.email,
			password: hashed,
		});

		try {
			const saved = await this.usersRepository.save(user);
			console.log('AuthService: user saved id=', saved.id);
			// Exclude password from returned object
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password, ...rest } = saved as any;
			return rest as Partial<User>;
		} catch (err) {
			console.error('AuthService.register error:', err);
			throw new InternalServerErrorException('Could not create user');
		}
	}
}
