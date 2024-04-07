import { Module } from '@nestjs/common';
import { NFTMetadataGeneratorService } from './nft-metadata-generator.service';
import { NFTMetadataGeneratorController } from './nft-metadata-generator.controller';
import { PinataModule } from 'src/pinata/pinata.module';

@Module({
  imports: [PinataModule],
  controllers: [NFTMetadataGeneratorController],
  providers: [NFTMetadataGeneratorService],
  exports: [NFTMetadataGeneratorService],
})
export class NFTMetadataGeneratorModule {}
