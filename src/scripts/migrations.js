const fs = require('fs');
const { Client } = require('pg');

const {
	POSTGRES_HOST,
	POSTGRES_PORT,
	POSTGRES_DB,
	POSTGRES_USER,
	POSTGRES_PASSWORD
} = process.env;

const client = new Client({
	user: POSTGRES_USER,
	host: POSTGRES_HOST,
	port: Number(POSTGRES_PORT),
	database: POSTGRES_DB,
	password: POSTGRES_PASSWORD,
});

const MIGRATION_FILES_DIR = __dirname + '/../db/migrations';

const EMPTY_MIGRATION_FILE = 'module.exports = ``;'

const getMigrationFiles = async () => {
	const dirElements = await fs.promises.readdir(MIGRATION_FILES_DIR);
	return dirElements.filter((elem) => /^[0-9]+_.+\.js$/.test(elem));
};

const migrate = async () => {
	await client.connect();
	const allFiles = await getMigrationFiles();
	try {
		await client.query('begin');
		await client.query(`create table if not exists "db_migrations" (timestamp bigint primary key)`);
		const res = await client.query('select timestamp from "db_migrations" order by timestamp desc limit 1;');

		const lastMigration = res.rows.length > 0 ? Number(res.rows[0].timestamp) : 0;

		const filesToRun = allFiles
			.map((name) => ({
				name,
				timestamp: Number(name.split('_')[0]),
			}))
			.filter((file) => file.timestamp > lastMigration);

		if (filesToRun.length > 0) {
			for (const file of filesToRun) {
				const query = require(`${MIGRATION_FILES_DIR}/${file.name}`).default;
				console.log(query);
				await client.query(query);
			}

			const timestamps = filesToRun.map(f => `(${f.timestamp})`).join(', ');
			await client.query(`insert into "db_migrations" (timestamp) values ${timestamps}`);
		}

		await client.query('commit');

		console.log('Migrations finished.');
	} catch (e) {
		console.log(`${String(e)}. Executing ROLLBACK.`);
		await client.query('rollback');
	} finally {
		await client.end();
	}
};

const createMigration = async (args) => {
	const [name] = args;

	if (!name) {
		throw new Error('Provide a file name');
	}

	const date = new Date();

	const prefix = [
		date.getFullYear(),
		String(date.getMonth() + 1).padStart(2, '0'),
		String(date.getDate()).padStart(2, '0'),
		String(date.getUTCHours()).padStart(2, '0'),
		String(date.getUTCMinutes()).padStart(2, '0'),
		String(date.getUTCSeconds()).padStart(2, '0'),
	].join('');

	const finalFilename = `${prefix}_${name}.js`;

	await fs.promises.writeFile(`${MIGRATION_FILES_DIR}/${finalFilename}`, EMPTY_MIGRATION_FILE);

	console.log(`Migration file created: ${finalFilename}.`);
};

const main = async (args) => {
	const [command, ...extraArgs] = args;

	if (command === 'run') {
		await migrate();
	} else if (command === 'create') {
		await createMigration(extraArgs);
	}
};

const commandArgs = process.argv.slice(2);
main(commandArgs);