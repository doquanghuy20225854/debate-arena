import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS (allow frontend dev port). Adjust origin as needed.
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3002', 'http://localhost:3000'],
    credentials: true,
  });
  
  // Validation
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(3000);
  console.log('Backend running on http://localhost:3000');
}
bootstrap();