import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, name, password } = createUserDto;
    const user = this.create();
    user.email = email;
    user.name = name;
    user.password = password;
    await user.save();
    return user;
  }

  async findAllUser(): Promise<User[]> {
    const users = await this.find();
    return users;
  }

  async findUserById(id: string): Promise<User | undefined> {
    const users = await this.findOneBy({ id });
    return users;
  }

  async UpdateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    // const user = await this.findOneBy({ id });
    const userUpdated = await this.update({ id }, updateUserDto);
    return userUpdated;
  }

  async deleteUser(id: string): Promise<void> {
    await this.delete(id);
  }
}
