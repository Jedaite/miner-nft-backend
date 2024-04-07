import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NFTMetadataGeneratorService } from './nft-metadata-generator.service';
import { GenerateMetadataResponseDto } from './dto/generate-metadata-response.dto';

@ApiTags('nft-metadata-controller')
@Controller('nft-metadata')
export class NFTMetadataGeneratorController {
  constructor(
    private readonly nftMetadataGeneratorService: NFTMetadataGeneratorService,
  ) {}

  @ApiOkResponse({ type: GenerateMetadataResponseDto })
  @Get('generate-metadata')
  async generateMetadata(): Promise<GenerateMetadataResponseDto> {
    return await this.nftMetadataGeneratorService.generateMetadata();
  }
}
