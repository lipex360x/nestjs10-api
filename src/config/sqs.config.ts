import 'dotenv/config';
import { SQS } from '@aws-sdk/client-sqs';

export const sqs = new SQS({
  region: process.env.AWS_REGION || 'us-east-1',
  ...(process.env.NODE_ENV?.toLowerCase() !== 'production' && {
    endpoint: 'http://127.0.0.1:4566',
  }),
});
