// import { registerAs } from '@nestjs/config';
// import { config as dotenvConfig } from 'dotenv';
// import { DataSource, DataSourceOptions } from 'typeorm';

// dotenvConfig({ path: '.env' });
// const config = {
//   type: 'postgres',
//   host: `${process.env.DB_HOST}`,
//   port: parseInt(process.env.DB_PORT, 10) || 5432,
//   username: `${process.env.DB_USERNAME}`,
//   password: `${process.env.DB_PASSWORD}`,
//   database: `${process.env.DB_NAME}`,
//   synchronize: true,
//   entities: ['dist/**/*.entity{.ts,.js}'],
//   migrations: ['dist/migrations/*{.ts,.js}'],
//   autoLoadEntities: true,
//   logging: true,
//   // dropSchema: true,
// };

// export default registerAs('typeOrm', () => config);
// export const conectionSource = new DataSource(config as DataSourceOptions);
