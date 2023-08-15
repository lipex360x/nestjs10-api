import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './exceptions-filters/prisma.exception-filter';
import { AllExceptionFilter } from './exceptions-filters/all-exceptions-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(
    new AllExceptionFilter(httpAdapter),
    new PrismaExceptionFilter(),
  );
  app.setGlobalPrefix('/api/v1');

  await app.listen(3000);
}
bootstrap();
