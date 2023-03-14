const Pool = require('pg').Pool
require('dotenv').config();

const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_POST,
  })

  module.exports ={
    pool
  }