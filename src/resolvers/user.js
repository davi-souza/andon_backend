const jwt = require('jsonwebtoken');
const { errorTypes } = require('../errors');
const { getUser: getUserDb, getUsers: getUsersDb } = require('../db/users');

const { JWT_SECRET } = process.env;

const login = async () => {
	if (!JWT_SECRET) {
		throw new Error(errorTypes.SERVER_ERROR);
	}
	if (!username) {
		throw new Error(errorTypes.USERNAME_NOT_PROVIDED);
	}
	if (!password) {
		throw new Error(errorTypes.PASSWORD_NOT_PROVIDED);
	}

	const userDb = await getUserDb({ username });

	if (userDb.password !== password) {
		throw new Error(errorTypes.INVALID_PASSWORD);
	}

	const user = {
		...userDb,
		password: null,
	};

	const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });

	return {
		...user,
		token,
	};
}

const getUser = async ({ id }) => {
	return await getUserDb({ id });
};

const getUsers = async () => {
	return await getUsersDb();
};

module.exports = {
	login,
	getUser,
	getUsers,
};