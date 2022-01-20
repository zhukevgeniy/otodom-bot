import { NestFactory } from '@nestjs/core';
import { SentryService } from '@ntegral/nestjs-sentry';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });

  app.enableShutdownHooks();

  app.useLogger(SentryService.SentryServiceInstance());

  await app.listen(process.env.PORT || 8080);
}

bootstrap();
