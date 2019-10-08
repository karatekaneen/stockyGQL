exports.createSchema = ({
	graphql = require('graphql'),
	Firestore = require('@google-cloud/firestore'),
	secrets = require('../../secrets.json'),
	getFields = require('./helpers/fieldsHelper').getFields,
	createStock = require('./types/Stock').createStock
}) => {
	const { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = graphql

	const db = new Firestore(secrets)

	const StockType = new GraphQLObjectType({
		name: 'Stock',
		description: 'Basic stock object - find where this is displayed???',

		fields: () => ({
			name: {
				type: GraphQLString,
				description: 'Pretty name',
				resolve: data => data.name
			},
			id: {
				type: GraphQLInt,
				resolve: data => data.id
			}
		})
	})

	return new GraphQLSchema({
		query: new GraphQLObjectType({
			name: 'Query',
			description: 'Basic stock query.',

			fields: () => ({
				stocks: {
					type: new GraphQLList(StockType),
					args: {
						id: { type: GraphQLInt },
						name: { type: GraphQLString }
					},
					description: 'Root of stock object.',
					resolve: async (root, args) => {
						const output = []
						const allDocs = await db.collection('stocks').get()
						allDocs.forEach(doc => output.push(doc.data()))
						return output
					}
				},
				stock: createStock({})
			})
		})
	})
}
