module.exports = `
type Mutation {
	login(username: String!, password: String!): UserLogin!
}
`.trim();