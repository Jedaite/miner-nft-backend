import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PinataService } from 'src/pinata/pinata.service';
import {
  Background,
  Tier,
  Eyes,
  Mouth,
  Hair,
  Clothes,
} from './nft-metadata-generator.enums';
import { BoulderPower, RelicPower } from './nft-metadata-generator.types';
import {
  AttributesDto,
  GenerateMetadataResponseDto,
  MetadataDto,
} from './dto/generate-metadata-response.dto';
import { inspect } from 'util';
import { RandomPicker } from 'src/common/utils/random-picker.util';

@Injectable()
export class NFTMetadataGeneratorService {
  private readonly logger: Logger = new Logger(
    NFTMetadataGeneratorService.name,
  );

  constructor(private readonly pinataService: PinataService) {}

  async generateMetadata(): Promise<GenerateMetadataResponseDto> {
    try {
      const name = 'Miner';
      const symbol = 'MNR';
      const description = 'Miner-citizen';
      const image =
        'https://ipfs.io/ipfs/QmRi6CyKRn5nEVgjoK87Z8ssXmGzFBkoXPmsnusfonzJgx';
      const attributes: AttributesDto[] = [
        {
          trait_type: 'Tier',
          value: this.generateTier(),
        },
        {
          trait_type: 'Background',
          value: this.generateBackground(),
        },
        {
          trait_type: 'Eyes',
          value: this.generateEyes(),
        },
        {
          trait_type: 'Mouth',
          value: this.generateMouth(),
        },
        {
          trait_type: 'Hair',
          value: this.generateHair(),
        },
        {
          trait_type: 'Clothes',
          value: this.generateClothes(),
        },
        {
          trait_type: 'Relic Power',
          value: this.generateRelicPower(),
        },
        {
          trait_type: 'Boulder Power',
          value: this.generateBoulderPower(),
        },
      ];

      const metadata: MetadataDto = {
        name,
        symbol,
        description,
        image,
        attributes,
      };

      const { IpfsHash } = await this.pinataService.uploadMetadata(metadata, {
        pinataMetadata: {
          name: 'Miner NFT metadata',
        },
      });

      return {
        metadata,
        ipfsHash: IpfsHash,
      };
    } catch (error) {
      this.logger.error(
        'Failed to generate metadata',
        inspect(error, { depth: null }),
      );

      throw new InternalServerErrorException('Failed to generate metadata');
    }
  }

  generateTier(): Tier {
    return new RandomPicker([{ original: Tier.Miner, weight: 100 }]).pick();
  }

  generateBackground(): Background {
    return new RandomPicker([
      { original: Background.Mystical, weight: 20 },
      { original: Background.Dark, weight: 20 },
      { original: Background.Misty, weight: 20 },
      { original: Background.Jade, weight: 20 },
      { original: Background.Light, weight: 20 },
    ]).pick();
  }

  generateEyes(): Eyes {
    return new RandomPicker([
      { original: Eyes.Glowing, weight: 20 },
      { original: Eyes.Focused, weight: 20 },
      { original: Eyes.Tired, weight: 20 },
      { original: Eyes.Closed, weight: 20 },
      { original: Eyes.Serious, weight: 20 },
    ]).pick();
  }

  generateMouth(): Mouth {
    return new RandomPicker([
      { original: Mouth.JadeTooth, weight: 20 },
      { original: Mouth.Laughing, weight: 20 },
      { original: Mouth.Whistling, weight: 20 },
      { original: Mouth.Smirking, weight: 20 },
      { original: Mouth.Smiling, weight: 20 },
    ]).pick();
  }

  generateHair(): Hair {
    return new RandomPicker([
      { original: Hair.JadeStreaks, weight: 20 },
      { original: Hair.Shaved, weight: 20 },
      { original: Hair.Curly, weight: 20 },
      { original: Hair.Braided, weight: 20 },
      { original: Hair.Short, weight: 20 },
    ]).pick();
  }

  generateClothes(): Clothes {
    return new RandomPicker([
      { original: Clothes.JadeVeinVest, weight: 20 },
      { original: Clothes.MinersTank, weight: 20 },
      { original: Clothes.GemstoneGambeson, weight: 20 },
      { original: Clothes.DustCoat, weight: 20 },
      { original: Clothes.Engineersjacket, weight: 20 },
    ]).pick();
  }

  generateRelicPower(): RelicPower {
    return new RandomPicker([
      { original: 1, weight: 25 },
      { original: 2, weight: 20 },
      { original: 3, weight: 15 },
      { original: 4, weight: 12 },
      { original: 5, weight: 8 },
      { original: 6, weight: 7 },
      { original: 7, weight: 6 },
      { original: 8, weight: 4 },
      { original: 9, weight: 2 },
      { original: 10, weight: 1 },
    ]).pick();
  }

  generateBoulderPower(): BoulderPower {
    return new RandomPicker([
      { original: 1, weight: 25 },
      { original: 2, weight: 20 },
      { original: 3, weight: 15 },
      { original: 4, weight: 12 },
      { original: 5, weight: 8 },
      { original: 6, weight: 7 },
      { original: 7, weight: 6 },
      { original: 8, weight: 4 },
      { original: 9, weight: 2 },
      { original: 10, weight: 1 },
    ]).pick();
  }
}
