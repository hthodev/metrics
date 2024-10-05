//for seed and migration sequelize

module.exports = {
  sandbox: {
    username: process.env.DB_USERNAME || 'dev',
    password: process.env.DB_PASSWORD || 'localdev',
    database: process.env.DB_DATABASE || 'backenddb',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
  },
  production: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
        ca: process.env.CA_CERTIFICATE,
      },
    },
  },
};
