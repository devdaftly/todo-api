import { Controller, Get, Post, Param, Body, Put, NotImplementedException, UseFilters } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CreateTaskDto } from './create-task.dto';
import { TasksService } from './tasks.service';
import { Task } from './task';
import { HttpExceptionFilter } from 'src/http-exception.filter';

// TODO: Use a proper UUID library instead; this isn't meant for public consumption
import { randomStringGenerator as generateUuid } from '@nestjs/common/utils/random-string-generator.util'

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
      id: generateUuid()
    } as Task);
  }

  @Put(':id')
  update(@Body() updateTask: CreateTaskDto) {
    throw new NotImplementedException();
  }
}
