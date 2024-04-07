import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ContractService } from './contract.service';
import { FindNFTByMintDto } from './dto/get-total-staked-usd-response.dto';
import { Sft, SftWithToken, Nft, NftWithToken } from '@metaplex-foundation/js';

@ApiTags('contract-controller')
@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @ApiOkResponse()
  @Get('findNFTByMint')
  async findNFTByMint(
    @Query() dto: FindNFTByMintDto,
  ): Promise<Sft | SftWithToken | Nft | NftWithToken | null> {
    return await this.contractService.findNFTByMint(dto);
  }
}
