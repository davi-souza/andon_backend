const { buildSchema } = require('graphql');
const types = require('./types');
const inputs = require('./inputs');
const queries = require('./queries');
const mutations = require('./mutations');

const schema = [
	types,
	inputs,
	queries,
	mutations,
].join('\n');

module.exports = buildSchema(schema);