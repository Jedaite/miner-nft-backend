import { PublicKey } from '@solana/web3.js';
import { ValidateBy, ValidationOptions, buildMessage } from 'class-validator';

export const IS_VALID_SOLANA_ADDRESS = 'isValidSolanaAddress';

export function isValidSolanaAddress(value: unknown): boolean {
  try {
    return typeof value === 'string' && PublicKey.isOnCurve(value);
  } catch (error) {
    return false;
  }
}

export function IsValidSolanaAddress(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_VALID_SOLANA_ADDRESS,
      validator: {
        validate: (value): boolean => isValidSolanaAddress(value),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix + '$property must be a valid Solana address',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
