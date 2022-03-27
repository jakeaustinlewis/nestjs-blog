import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

// Providers: Array of providers to be available within the module via dependancy injection

// Controllers: Array of controllers to be instantiated within the module.

// Exports: Array of providers to export to other modules.

// Imports: List of modules required by this module. Any exported provider by
// thtese modules will now be available in our module via dependancy injection
@Module({
  imports: [TasksModule],
})
export class AppModule {}
