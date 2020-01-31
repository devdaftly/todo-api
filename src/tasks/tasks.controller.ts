import { Controller, Get, Post, Param, Body, Put, NotImplementedException, UseFilters } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CreateTaskDto } from './create-task.dto';
import { TasksService } from './tasks.service';
import { Task } from './task';
import { HttpExceptionFilter } from '../http-exception.filter';

import { v4 as uuid } from 'uuid';

@Controller('tasks')
@UseFilters(HttpExceptionFilter)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(): Observable<Task[]> {
    return of(this.tasksService.findAll());
  }

  @Get(':id')
  findOneById(@Param('id') id): Observable<Task> {
    return of(this.tasksService.findOneById(id));
  }

  @Post()
  create(@Body() createTask: CreateTaskDto) {
    this.tasksService.create({
      ...createTask,
      id: this.generateUuid()
    } as Task);
  }

  @Put(':id')
  update(@Body() updateTask: CreateTaskDto) {
    throw new NotImplementedException();
  }

  private generateUuid(): string {
    return uuid();
  }
}
