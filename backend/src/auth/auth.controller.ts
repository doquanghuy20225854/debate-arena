import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	@UsePipes(new ValidationPipe({ whitelist: true }))
	async register(@Body() dto: RegisterDto) {
		console.log('AuthController.register received', dto.username, dto.email);
		const user = await this.authService.register(dto);
		console.log('AuthController.register success for', user.id || user.username);
		return {
			statusCode: HttpStatus.CREATED,
			message: 'User registered successfully',
			data: user,
		};
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	@UsePipes(new ValidationPipe({ whitelist: true }))
	async login(@Body() dto: LoginDto) {
		console.log('AuthController.login attempt', dto.email);
		const result = await this.authService.login(dto);
		return {
			statusCode: HttpStatus.OK,
			message: 'Login successful',
			data: result,
		};
	}
}
