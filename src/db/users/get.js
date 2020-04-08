const pool = require('../pool');
const { errorTypes } = require('../../errors');

const getUser = async (search) => {
	const { id, username } = search;

	if (!id && !username) {
		throw new Error(errorTypes.MISSING_PARAMETERS);
	}

	const parameters = id ? [id] : [username];

	const { rows, rowCount } = await pool.query(
		`select *
		from "user" where deleted_at is null
		${id ? 'and id = $1' : ''}
		${username ? 'and username = $1' : ''}
		`,
		parameters
	);

	if (rowCount !== 1) {
		throw new Error(errorTypes.USER_NOT_FOUND);
	}

	return rows[0];
};

const getUsers = async () => {
	const { rows } = await pool.query(
		'select * from "user" where deleted_at is null',
	);

	return rows;
};

module.exports = {
	getUser,
	getUsers,
};