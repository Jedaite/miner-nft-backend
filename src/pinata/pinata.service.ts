import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import PinataClient, { PinataPinOptions, PinataPinResponse } from '@pinata/sdk';
import { ConfigSchema } from 'src/config/config.schema';
import { ConfigService } from 'src/config/config.service';
import { inspect } from 'util';

@Injectable()
export class PinataService {
  private readonly logger: Logger = new Logger(PinataService.name);
  private readonly pinataClient: PinataClient;

  constructor(private readonly configService: ConfigService<ConfigSchema>) {
    this.pinataClient = new PinataClient({
      pinataApiKey: this.configService.get<string>('PINATA_API_KEY'),
      pinataSecretApiKey: this.configService.get<string>(
        'PINATA_SECRET_API_KEY',
      ),
    });
  }

  async uploadMetadata(
    body: any,
    options?: PinataPinOptions,
  ): Promise<PinataPinResponse> {
    try {
      return await this.pinataClient.pinJSONToIPFS(body, options);
    } catch (error) {
      this.logger.error(
        'Failed to upload NFT metadata to IPFS',
        inspect(error, { depth: null }),
      );

      throw new InternalServerErrorException(
        'Failed to upload NFT metadata to IPFS',
      );
    }
  }
}
