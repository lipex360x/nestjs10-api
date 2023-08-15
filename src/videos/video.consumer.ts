import { Message } from '@aws-sdk/client-sqs';
import { Injectable, Logger } from '@nestjs/common';
import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs';

@Injectable()
export class VideoSQSConsumer {
  private readonly logger = new Logger(VideoSQSConsumer.name);

  @SqsMessageHandler('SQS_QUEUE', false)
  public async handleMessage(message: Message) {
    if (message.Body) {
      console.log(message.Body);
    }
  }

  @SqsConsumerEventHandler('SQS_QUEUE', 'processing_error')
  public async onProcessingError(error: Error, message: Message) {
    console.log(error, message);
  }
}
