const errorTypes = {
	SERVER_ERROR: 'SERVER_ERROR',
	UNAUTHORIZED: 'UNAUTHORIZED',
	MISSING_PARAMETERS: 'MISSING_PARAMETERS',
	ENTITY_NOT_FOUND: 'USER_NOT_FOUND',
	USERNAME_NOT_PROVIDED: 'USERNAME_NOT_PROVIDED',
	PASSWORD_NOT_PROVIDED: 'PASSWORD_NOT_PROVIDED',
	USER_NOT_FOUND: 'USER_NOT_FOUND',
	INVALID_PASSWORD: 'INVALID_PASSWORD',
};

const errors = {
	SERVER_ERROR: {
		message: 'Houve um problema. Por favor, tentar mais tarde',
		status: 500,
	},
	UNAUTHORIZED: {
		message: 'Não autorizado',
		status: 401,
	},
	MISSING_PARAMETERS: {
		message: 'Por favor, fernecer todos os parâmetros',
		status: 400,
	},
	USERNAME_NOT_PROVIDED: {
		message: 'Por favor, fornecer um usuário',
		status: 400,
	},
	PASSWORD_NOT_PROVIDED: {
		message: 'Por favor, fornecer uma senha',
		status: 400,
	},
	ENTITY_NOT_FOUND: {
		message: 'Entidade não encontrada',
		status: 404,
	},
	USER_NOT_FOUND: {
		message: 'Usuário não encontrado',
		status: 404,
	},
	INVALID_PASSWORD: {
		message: 'Senha inválida',
		status: 401,
	},
};

const customFormatErrorFn = (e) => {
	console.log(e);
	const { message } = e;
	return errors[message] || errors.SERVER_ERROR;
};

module.exports = {
	errorTypes,
	errors,
	customFormatErrorFn
}