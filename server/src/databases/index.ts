import config from 'config';
import { dbConfig } from '~types/db.interface';

const { host, port, database }: dbConfig = config.get('dbConfig');

export const dbConnection = {
  url: `mongodb://${host}:${port}/${database}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};
