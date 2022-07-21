import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const mockUserService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('UsersController', () => {
  let service: any;
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    let mockCreateUserDto: CreateUserDto;

    beforeEach(() => {
      mockCreateUserDto = {
        email: 'mock@email.com',
        name: 'Mock User',
        password: 'mockPassword',
      };
    });

    it('should create an user if passwords match', async () => {
      service.create.mockResolvedValue('mockUserCreated');
      const result = await controller.create(mockCreateUserDto);

      expect(result).toEqual('mockUserCreated');
    });
  });

  describe('findAll', () => {
    it('should find all users', async () => {
      service.findAll.mockResolvedValue(['user1', 'user2', 'user3']);
      const result = await controller.findAll();

      expect(result).toEqual(['user1', 'user2', 'user3']);
    });
  });

  describe('findOne', () => {
    it('should find one user', async () => {
      service.findOne.mockResolvedValue({ user: 'user1' });
      const result = await controller.findOne('mockId');

      expect(result).toEqual({ user: 'user1' });
    });

    it('should return message', async () => {
      service.findOne.mockResolvedValue({ message: 'User not found' });
      const result = await controller.findOne('mockId');

      expect(result).toEqual({ message: 'User not found' });
    });
  });

  describe('update', () => {
    it('should update one user', async () => {
      service.update.mockResolvedValue('mockUserUpdated');
      const result = await controller.update('mockId', { name: 'User1' });

      expect(result).toEqual('mockUserUpdated');
    });

    it('should return message', async () => {
      service.update.mockResolvedValue({ message: 'User not found' });
      const result = await controller.update('mockId', { name: 'User1' });
      expect(result).toEqual({ message: 'User not found' });
    });
  });

  describe('remove', () => {
    it('should delete one user', async () => {
      service.remove.mockResolvedValue('mockId');
      await controller.remove('mockId');
      expect(service.remove).toHaveBeenCalledWith('mockId');
    });

    it('should return message', async () => {
      service.remove.mockResolvedValue({ message: 'User not found' });
      const result = await service.remove('mockId');
      expect(result).toEqual({ message: 'User not found' });
    });
  });
});
