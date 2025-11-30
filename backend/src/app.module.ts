import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { TopicsModule } from './topics/topics.module';
import { DebatesModule } from './debates/debates.module';
import { VotesModule } from './votes/votes.module';
import { ChatModule } from './chat/chat.module';
import { EventsGateway } from './events/events.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT') || '3306', 10),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // CHỈ dùng trong development
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    RoomsModule,
    TopicsModule,
    DebatesModule,
    VotesModule,
    ChatModule,
  ],
  providers: [EventsGateway],
})
export class AppModule {}