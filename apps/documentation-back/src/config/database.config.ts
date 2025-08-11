import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Article } from '../entities/article.entity';
import { User } from '../entities/user.entity';
import { config } from './config';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: config.DATABASE_URL,
  entities: [User, Article],
  synchronize: false,
  logging: true,
};
