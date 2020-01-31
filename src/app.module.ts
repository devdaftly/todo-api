import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [TasksModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('tasks');
  }
}
