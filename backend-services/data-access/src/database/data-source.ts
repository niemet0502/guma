import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'neka-db',
  port: 5432,
  username: 'marius',
  password: 'root',
  database: 'neka',
  entities: ['dist/**/*entity.js'],
  // migrations: ['dist/database/migrations/*js'],
  synchronize: true,
};
const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
