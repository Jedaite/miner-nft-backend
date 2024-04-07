import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ConfigModule } from './config/config.module';
import { ConfigSchema } from './config/config.schema';
import { NFTMetadataGeneratorModule } from './nft-metadata-generator/nft-metadata-generator.module';
import { PinataModule } from './pinata/pinata.module';

@Module({
  imports: [
    ConfigModule.register(ConfigSchema),
    HealthModule,
    NFTMetadataGeneratorModule,
    PinataModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
