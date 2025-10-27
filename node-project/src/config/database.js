// // database.js
// const { Pool } = require("pg");
// require("dotenv").config();

// const pool = new Pool({
//   connectionString: process.env.DATABASE_PUBLIC_URL,
//   ssl: { rejectUnauthorized: false }
// });

// pool.on("connect", () => {
//   console.log("Conectado a la base de datos ✅");
// });

// pool.on("error", (err) => {
//   console.error("Error en la conexión a la DB", err);
// });

// module.exports = pool;

// config/supabaseClient.js
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // o SERVICE_ROLE_KEY si es backend seguro

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;

