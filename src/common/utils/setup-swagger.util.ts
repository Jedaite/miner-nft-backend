import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigSchema } from 'src/config/config.schema';
import { ConfigService } from 'src/config/config.service';

export function setupSwagger(
  path: string,
  app: INestApplication<any>,
  configService: ConfigService<ConfigSchema>,
): void {
  const config = new DocumentBuilder()
    .setTitle(configService.get('SWAGGER_TITLE'))
    .setDescription(configService.get('SWAGGER_DESCRIPTION'))
    .setVersion(configService.get('SWAGGER_VERSION'))
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(path, app, document);
}
