import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'pguser',
  password: 'postgres',
  database: 'user_register_db',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};