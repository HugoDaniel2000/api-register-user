import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: '1234567',
  database: 'user_register_db',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
