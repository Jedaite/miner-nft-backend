import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { getLogLevel } from './utils/get-log-level.util';
import { setupSwagger } from './utils/setup-swagger.util';
import { ConfigService } from './config/config.service';
import { ConfigSchema } from './config/config.schema';

export const APP_GLOBAL_PREFIX: string = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<ConfigSchema>>(ConfigService);
  const logger = new Logger(NestApplication.name);

  app.enableCors();
  app.enableShutdownHooks();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: true,
      skipUndefinedProperties: false,
      skipNullProperties: false,
      skipMissingProperties: false,
      whitelist: true,
      forbidUnknownValues: true,
      disableErrorMessages: false,
    }),
  );
  app.useLogger(getLogLevel(configService.get('NODE_ENV')));
  app.setGlobalPrefix(APP_GLOBAL_PREFIX);

  setupSwagger(APP_GLOBAL_PREFIX, app, configService);

  const port = configService.get<number>('PORT');
  const host = configService.get<string>('HOST');
  await app.listen(port, host, () => {
    logger.log(`Server started at ${host}:${port}`);
  });
}
bootstrap();
