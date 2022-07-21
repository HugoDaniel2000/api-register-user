import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';

const mockUserRepository = () => ({
  createUser: jest.fn(),
  findAllUser: jest.fn(),
  findUserById: jest.fn(),
  UpdateUser: jest.fn(),
  deleteUser: jest.fn(),
});

describe('UsersService', () => {
  let userRepository: any;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
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
      userRepository.createUser.mockResolvedValue('mockUserCreated');
      const result = await service.create(mockCreateUserDto);

      expect(userRepository.createUser).toHaveBeenCalledWith(mockCreateUserDto);
      expect(result).toEqual('mockUserCreated');
    });
  });

  describe('findAll', () => {
    it('should find all users', async () => {
      userRepository.findAllUser.mockResolvedValue(['user1', 'user2', 'user3']);
      const result = await service.findAll();

      expect(result).toEqual(['user1', 'user2', 'user3']);
    });
  });

  describe('findOne', () => {
    it('should find one user', async () => {
      userRepository.findUserById.mockResolvedValue({ user: 'user1' });
      const result = await service.findOne('mockId');

      expect(userRepository.findUserById).toHaveBeenCalledWith('mockId');
      expect(result).toEqual({ user: 'user1' });
    });

    it('should return message', async () => {
      userRepository.findUserById.mockResolvedValue(null);
      const result = await service.findOne('mockId');

      expect(userRepository.findUserById).toHaveBeenCalledWith('mockId');
      expect(result).toEqual({ message: 'User not found' });
    });
  });

  describe('update', () => {
    it('should update one user', async () => {
      userRepository.UpdateUser.mockResolvedValue('mockUserUpdated');
      userRepository.findUserById.mockResolvedValue('mockId');
      const result = await service.update('mockId', { name: 'User1' });

      expect(userRepository.UpdateUser).toHaveBeenCalledWith('mockId', {
        name: 'User1',
      });
      expect(result).toEqual('mockUserUpdated');
    });

    it('should return message', async () => {
      userRepository.UpdateUser.mockResolvedValue('mockUserUpdated');
      userRepository.findUserById.mockResolvedValue(null);
      const result = await service.update('mockId', { name: 'User1' });
      expect(result).toEqual({ message: 'User not found' });
    });
  });

  describe('remove', () => {
    it('should delete one user', async () => {
      userRepository.findUserById.mockResolvedValue('mockId');
      await service.remove('mockId');
      expect(userRepository.deleteUser).toHaveBeenCalledWith('mockId');
    });

    it('should return message', async () => {
      userRepository.findUserById.mockResolvedValue(null);
      const result = await service.remove('mockId');
      expect(result).toEqual({ message: 'User not found' });
    });
  });
});
