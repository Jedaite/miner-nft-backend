import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { AnchorProvider, Idl, Program } from '@project-serum/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import { ConfigService } from 'src/config/config.service';
import IDL from 'src/contract/idl/miner_nft.json';
import { FindNFTByMintDto } from './dto/get-total-staked-usd-response.dto';
import {
  AccountNotFoundError,
  Metaplex,
  Nft,
  NftWithToken,
  Sft,
  SftWithToken,
} from '@metaplex-foundation/js';
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey';
import { inspect } from 'util';

@Injectable()
export class ContractService {
  private readonly logger: Logger = new Logger(ContractService.name);
  private readonly program: Program<Idl>;
  private readonly metaplex: Metaplex;

  constructor(private readonly configService: ConfigService) {
    /* Program */

    const idl = IDL as Idl;
    const programId = idl.metadata.address;
    const connection = new Connection(
      this.configService.get<string>('SOLANA_RPC_URL'),
      {
        commitment: 'confirmed',
      },
    );
    const provider = new AnchorProvider(connection, null, {
      commitment: 'confirmed',
    });
    this.program = new Program(idl, programId, provider);

    /* Metaplex */

    this.metaplex = Metaplex.make(connection);
  }

  userDataPDA(walletAddress: string | PublicKey): {
    address: PublicKey;
    bump: number;
  } {
    const [address, bump] = findProgramAddressSync(
      [Buffer.from('userdata'), new PublicKey(walletAddress).toBuffer()],
      this.program.programId,
    );

    return {
      address,
      bump,
    };
  }

  async fetchUserDataPDA(userDataPDA: string | PublicKey): Promise<{
    nftMint: PublicKey | null;
  } | null> {
    try {
      return (await this.program.account.userData.fetchNullable(
        new PublicKey(userDataPDA),
      )) as any;
    } catch (error) {
      this.logger.error(
        'Failed to fetch user data PDA',
        inspect(error, { depth: null }),
      );

      throw new InternalServerErrorException('Failed to fetch user data PDA');
    }
  }

  async findNFTByMint({
    walletAddress,
  }: FindNFTByMintDto): Promise<
    Sft | SftWithToken | Nft | NftWithToken | null
  > {
    const userDataPDA = this.userDataPDA(walletAddress);
    const data = await this.fetchUserDataPDA(userDataPDA.address);
    if (!data) {
      throw new NotFoundException('User data PDA not found');
    }

    try {
      return await this.metaplex.nfts().findByMint({
        mintAddress: data.nftMint,
      });
    } catch (error) {
      if (error.constructor === AccountNotFoundError) {
        throw new NotFoundException(error.message);
      }

      this.logger.error(
        'Failed to find NFT by mint',
        inspect(error, { depth: null }),
      );

      throw new InternalServerErrorException('Failed to find NFT by mint');
    }
  }
}
