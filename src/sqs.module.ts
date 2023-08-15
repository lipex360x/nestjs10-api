import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { sqs } from './config/sqs.config';

@Module({
  imports: [
    SqsModule.register({
      consumers: [
        {
          sqs,
          name: 'SQS_QUEUE',
          queueUrl: 'http://127.0.0.1:4566/000000000000/SQS_QUEUE',
          messageAttributeNames: ['All'],
        },
      ],
      // producers: [
      //   {
      //     sqs,
      //     name: SQS_QUEUES.SQS_SUPPLIERS_SIGNERS,
      //     queueUrl: env.SQS_SUPPLIERS_SIGNERS,
      //   },
      // ],
    }),
  ],
})
export class SqsInternalModule {}
