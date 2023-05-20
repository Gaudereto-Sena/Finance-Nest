import { User } from './user/user.entity';
import { Asset } from './assets/assets.entity';
import { Operation } from './operations/operation.entity';
import { Earning } from './earnings/earning.entity';

export default {
  entities: [User, Operation, Asset, Earning],
  port: process.env.PORT,
  dbName: process.env.DB_NAME,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  type: 'mysql',
};

