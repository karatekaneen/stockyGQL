exports.createSingleStock = ({
	Firestore = require('@google-cloud/firestore'),
	secrets = require('../../../secrets.json'),
	graphql = require('graphql'),
	getFields = require('../helpers/fieldsHelper').getFields,
	StockType
}) => {
	const { GraphQLInt, GraphQLString } = graphql

	const db = new Firestore(secrets)

	return {
		type: StockType,
		args: {
			id: { type: GraphQLInt },
			name: { type: GraphQLString }
		},
		description: 'Fetches single stock',
		resolve: async (root, args, context, info) => {
			const fields = getFields(info)
			const matchingDocs = await db
				.collection('stocks')
				.where('id', '==', args.id)
				.select(...fields)
				.get()

			const output = matchingDocs.docs[0].data()
			return output
		}
	}
}

exports.createStockList = ({
	Firestore = require('@google-cloud/firestore'),
	secrets = require('../../../secrets.json'),
	graphql = require('graphql'),
	// getFields = require('../helpers/fieldsHelper').getFields,
	getStockList = require('../resolvers/dbResolvers').createGetStockList(),
	StockType
}) => {
	const { GraphQLInt, GraphQLString, GraphQLList } = graphql
	const db = new Firestore(secrets)

	return {
		type: new GraphQLList(StockType),
		args: {
			id: { type: GraphQLInt },
			name: { type: GraphQLString, description: 'Free text search of the "pretty" name' },
			list: { type: GraphQLString, description: 'Free text search of the list title' }
		},
		description: 'Get list of stocks.',
		resolve: getStockList
	}
}
