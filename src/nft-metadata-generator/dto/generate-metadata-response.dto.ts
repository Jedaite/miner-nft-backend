import { ApiProperty } from '@nestjs/swagger';

export class AttributesDto {
  @ApiProperty()
  'trait_type': string;

  @ApiProperty()
  value: any;
}

export class MetadataDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  symbol: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  @ApiProperty({ type: AttributesDto, isArray: true })
  attributes: AttributesDto[];
}

export class GenerateMetadataResponseDto {
  @ApiProperty({ type: MetadataDto })
  metadata: MetadataDto;

  @ApiProperty()
  ipfsHash: string;
}
