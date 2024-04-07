import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ConfigModule } from './config/config.module';
import { ConfigSchema } from './config/config.schema';
import { NFTMetadataGeneratorModule } from './nft-metadata-generator/nft-metadata-generator.module';
import { PinataModule } from './pinata/pinata.module';
import { ContractModule } from './contract/contract.module';

@Module({
  imports: [
    ConfigModule.register(ConfigSchema),
    HealthModule,
    NFTMetadataGeneratorModule,
    PinataModule,
    ContractModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
