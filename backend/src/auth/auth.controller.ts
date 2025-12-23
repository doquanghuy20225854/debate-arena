import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

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
}
