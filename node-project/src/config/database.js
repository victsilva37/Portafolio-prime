const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_PUBLIC_URL,
  ssl: { rejectUnauthorized: false } // importante si es Render o Supabase
});

module.exports = pool;

// database.js
// const { Pool } = require("pg");
// require("dotenv").config();

// // Si estás en desarrollo local, usa los parámetros individuales.
// // Si estás en producción (Render/Vercel), usa la variable DATABASE_PUBLIC_URL.
// const isProduction = process.env.NODE_ENV === "production";

// const pool = new Pool(
//   isProduction
//     ? {
//         connectionString: process.env.DATABASE_PUBLIC_URL,
//         ssl: { rejectUnauthorized: false },
//       }
//     : {
//         user: process.env.DB_USER || "postgres",
//         host: process.env.DB_HOST || "localhost",
//         database: process.env.DB_NAME || "portafolio_db",
//         password: process.env.DB_PASSWORD || "tu_contraseña",
//         port: process.env.DB_PORT || 5432,
//       }
// );

module.exports = pool;
