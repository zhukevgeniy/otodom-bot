import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { sessionMiddleware } from './middlewares/session';
import { OtodomModule } from './otodom/otodom.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
