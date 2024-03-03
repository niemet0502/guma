import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLogger } from './logger/custom-logger.service';
import { otelSDK } from './tracing';

async function bootstrap() {
  await otelSDK.start();
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(new CustomLogger());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
