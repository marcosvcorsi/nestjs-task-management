import { Test } from '@nestjs/testing';
import { TasksRepository } from './taks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
});

const mockUser = () => ({
  id: 'any_id',
  username: 'any_username',
  password: 'any_passoword',
  tasks: [],
});

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useFactory: mockTasksRepository,
        },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    tasksRepository = module.get<TasksRepository>(TasksRepository);
  });

  describe('getAll', () => {
    it('shoud call TasksRepository get tasks and returns the result', async () => {
      tasksRepository.getTasks.mockResolvedValue('someValue');

      const result = await tasksService.getAll(null, mockUser());

      expect(tasksRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });
});
