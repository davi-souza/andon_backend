import pool from '../pool';

const insertWarning = async (payload) => {
	const {
		user_id,
		location_id,
		type,
		reason
	} = payload;

	const parameters = [user_id, location_id, type, reason];

	const { rows } = await pool.query(`
		insert into warning (user_id, location_id, type, reason)
		values ($1, $2, $3, $4) returning id, created_at, resolved_at, deleted_at
	`, parameters);

	return {
		...payload,
		id: rows[0].id,
		created_at: rows[0].created_at,
		resolved_at: rows[0].resolved_at,
		deleted_at: rows[0].deleted_at,
	};
};

module.exports = {
	insertWarning,
};