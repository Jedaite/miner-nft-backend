import { LogLevel } from '@nestjs/common';
import { Environment } from 'src/config/config.schema';

export const PRODUCTION_LOG_LEVEL: LogLevel[] = [
  'log',
  'error',
  'warn',
  'fatal',
];
export const DEVELOPMENT_LOG_LEVEL: LogLevel[] = [
  ...PRODUCTION_LOG_LEVEL,
  'debug',
  'verbose',
];

export function getLogLevel(env: Environment): LogLevel[] {
  switch (env) {
    case Environment.Production:
      return PRODUCTION_LOG_LEVEL;
    case Environment.Development:
      return DEVELOPMENT_LOG_LEVEL;
    default:
      throw new Error(`Failed to get log level for ${env} environment`);
  }
}
