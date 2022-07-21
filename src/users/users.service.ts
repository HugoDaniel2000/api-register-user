import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const userCreated = await this.userRepository.createUser(createUserDto);
    return userCreated;
  }

  async findAll(): Promise<User[]> {

    const users = await this.userRepository.findAllUser();
    return users;
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.userRepository.findUserById(id);
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const userUdated = await this.userRepository.UpdateUser(id, updateUserDto);
    return userUdated;
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.deleteUser(id);
  }
}
