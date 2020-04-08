const { Pool } = require ('pg');

const {
	POSTGRES_HOST,
	POSTGRES_PORT,
	POSTGRES_DB,
	POSTGRES_USER,
	POSTGRES_PASSWORD
} = process.env;

module.exports = new Pool({
	user: POSTGRES_USER,
	host: POSTGRES_HOST,
	port: Number(POSTGRES_PORT),
	database: POSTGRES_DB,
	password: POSTGRES_PASSWORD,
	max: 10,
	idleTimeoutMillis: 10000,
	connectionTimeoutMillis: 3000,
});