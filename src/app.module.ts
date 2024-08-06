import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatModule } from './cat/cat.module';
import { LoggerMiddleware } from './cat/logger.middleware';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './cat/role.guard';

@Module({
  imports: [CatModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RoleGuard
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats')
  }
}
