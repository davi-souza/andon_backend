module.exports = `
scalar Date
enum UserType {
	ADMIN
	ANDON_CENTRAL
	ANDON_WARNING_RESOLVER
	ANDON_WARNING_SENDER
}
type User {
	id: Int!
	client_id: Int!
	name: String!
	type: UserType!
	username: String!
	password: String
	created_at: Date!
	deleted_at: Date
}
type UserLogin {
	id: Int!
	client_id: Int!
	name: String!
	type: UserType!
	username: String!
	password: String
	created_at: Date!
	deleted_at: Date
	token: String!
}
`.trim();