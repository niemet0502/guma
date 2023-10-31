import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 5000,
  username: 'marius',
  password: 'root',
  database: 'thot',
  charset: 'utf8mb4',
  entities: ['dist/**/*entity.js'],
  migrations: ['dist/database/migrations/*js'],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
