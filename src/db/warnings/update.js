import pool from '../pool';

const resolveWarning = async ({ id, user_id }) => {
	const parameters = [id, user_id];

	await pool.query(`
		update "warning"
		set resolved_by = $2
			resolved_at = now()
		where id = $1
	`, parameters);
};

module.exports = {
	resolveWarning,
};