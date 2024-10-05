export default () => ({
    database: {
      sandbox: {
        dialect: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        user: process.env.DB_USERNAME || 'dev',
        password: process.env.DB_PASSWORD || 'localdev',
        database: process.env.DB_DATABASE || 'backenddb',
      },
      production: {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        ssl: {
            rejectUnauthorized: true,
            ca: process.env.CA_CERTIFICATE,
        },
      },
    },
  });

  