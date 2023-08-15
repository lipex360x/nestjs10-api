import { Module } from '@nestjs/common';

import { CategoriesModule } from './categories/categories.module';
import { PrismaModule } from './prisma/prisma.module';
import { VideosModule } from './videos/videos.module';
import { SqsInternalModule } from './sqs.module';

@Module({
  imports: [CategoriesModule, PrismaModule, VideosModule, SqsInternalModule],
})
export class AppModule {}
