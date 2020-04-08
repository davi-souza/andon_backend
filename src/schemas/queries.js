module.exports = `
type Query {
	getUser(id: Int!): User!
	getUsers: [User]!
}
`.trim();