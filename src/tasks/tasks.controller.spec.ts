import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './task';
import { CreateTaskDto } from './create-task.dto';
import { NotImplementedException } from '@nestjs/common';

describe('Tasks Controller', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(tasksController).toBeDefined();
  });

  describe('findAll', () => {
    let findAllSpy;
    let tasksReturnedBySpy: Task[];

    beforeEach(() => {
      tasksReturnedBySpy = [
        {
          id: 'abc',
          title: 'test task',
        },
      ];
      findAllSpy = jest.spyOn(tasksService, 'findAll')
        .mockReturnValue(tasksReturnedBySpy);
    });

    it('should call tasksService.findAll', () => {
      // Act
      tasksController.findAll();

      // Assert
      expect(findAllSpy).toHaveBeenCalled();
    });

    it('should return observable tasks', () => {
      // Act
      const returnedTasks = tasksController.findAll();

      // Assert
      returnedTasks.subscribe(tasks => {
        expect(tasks).toEqual(tasksReturnedBySpy);
      });
    });
  });

  describe('findOneById', () => {
    let findOneByIdSpy;
    let taskId: string;
    let taskReturnedBySpy: Task;

    beforeEach(() => {
      taskId = 'abe';
      taskReturnedBySpy = {
        id: taskId,
        title: 'test task',
      };
      findOneByIdSpy = jest.spyOn(tasksService, 'findOneById')
        .mockReturnValue(taskReturnedBySpy);
    });

    it('should call tasksService.findOneById', () => {
      // Act
      tasksController.findOneById(taskId);

      // Assert
      expect(findOneByIdSpy).toHaveBeenCalled();
    });

    it('should return observable of task', () => {
      // Act
      const returnedTask = tasksController.findOneById(taskId);

      // Assert
      returnedTask.subscribe(task => {
        expect(task).toEqual(taskReturnedBySpy);
      });
    });
  });

  describe('create', () => {
    let createSpy;
    let postedTask: CreateTaskDto;
    let taskId: string;

    beforeEach(() => {
      postedTask = {
        title: 'test task',
      };
      taskId = 'abc';
      createSpy = jest.spyOn(tasksService, 'create');
      jest.spyOn(tasksController as any, 'generateUuid').mockReturnValueOnce(taskId);
    });

    it('should call taskService.create with postedTask', () => {
      const createdTask: Task = {
        id: taskId,
        title: postedTask.title,
      };

      // Act
      tasksController.create(postedTask);

      // Assert
      expect(createSpy).toHaveBeenCalledWith(createdTask);
    });
  });
});
