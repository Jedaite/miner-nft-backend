# blaize-to-weway-backend

## Run project locally

1. Configure `.env` file

Minimal vars to be configured:
```
VAR                      | Type
SOLANA_RPC_URL=            string
PINATA_API_KEY=            string
PINATA_SECRET_API_KEY=     string
```

`SOLANA_RPC_URL` - Any free Solana RPC provider (Register on: https://getblock.io, https://www.quicknode.com, https://www.alchemy.com/solana etc).

`PINATA_API_KEY` and `PINATA_SECRET_API_KEY` - Register on: https://www.pinata.cloud/ to get credentials.

Maximum vars to be configured:
```
VAR                      | Type
NODE_ENV=                 string (enum: "development" | "production") | default: "development"
HOST=                     string | default: "0.0.0.0"
PORT=                     number | default: 3000
SWAGGER_TITLE=            string | default: "Jadeite"
SWAGGER_DESCRIPTION=      string | default: "Jadeite API"
SWAGGER_VERSION=          string | default: "1.0"
PINATA_API_KEY=           string
PINATA_SECRET_API_KEY=    string
SOLANA_RPC_URL=           string
```

2. Run project locally

Default mode:
```bash
npm run start
```

or run in DEV-mode:
```bash
npm run start:dev
```

## Enpoints

Swagger: `domain/api` or `http://localhost:3000/api`

1. `/api/nft-metadata/generate-metadata` - GET - generate and upload NFT metadata to IPFS (Pinata)
   
2. `/api/contract/findNFTByMint` - GET - find NFT by mint

## Deploy

Deploy your app using [Dockerfile](Dockerfile) and [deploy.yaml](github/workflows/deploy.yaml).
