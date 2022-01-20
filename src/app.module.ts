import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ScheduleModule } from '@nestjs/schedule';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OtodomModule } from './otodom/otodom.module';
import { sessionMiddleware } from './middlewares/session';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SentryModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dsn: configService.get<string>('SENTRY_DSN'),
        environment: process.env.NODE_ENV,
      }),
      inject: [ConfigService],
    }),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('TELEGRAM_BOT_TOKEN'),
        include: [OtodomModule],
        middlewares: [sessionMiddleware()],
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    OtodomModule,
  ],
})
export class AppModule {}
