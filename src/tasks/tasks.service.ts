import { Injectable } from '@nestjs/common';
import { Task } from './task';

@Injectable()
export class TasksService {
  private readonly tasks: Task[] = [];

  create(task: Task) {
    this.tasks.push(task);
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOneById(id: string): Task {
    return this.tasks.find(t => t.id === id);
  }
}
