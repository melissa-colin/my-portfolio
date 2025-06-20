import { createConnection } from 'mysql2/promise';

const db = createConnection({
  host: 'melissacolin.site', // e.g., 'localhost' or your database server
  user: 'u436612612_melissa',
  password: 'WQ$KDR3e7GI8Xg8c',
  database: 'u436612612_contnt_portfol'
});

export default db;