import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './models/tasks/tasks.module';
import { PostsModule } from './models/posts/posts.module';
import { AuthModule } from './models/auth/auth.module';

@Module({
  imports: [
    TasksModule,
    PostsModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'blog-db',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
