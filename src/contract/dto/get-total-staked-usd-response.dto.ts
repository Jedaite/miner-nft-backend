import { ApiProperty } from '@nestjs/swagger';
import { IsValidSolanaAddress } from 'src/common/decorators/is-valid-solana-address.decorator';

export class FindNFTByMintDto {
  @ApiProperty()
  @IsValidSolanaAddress()
  walletAddress: string;
}
