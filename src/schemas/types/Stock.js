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
			const sels = getFields(info)
			const matchingDocs = await db
				.collection('stocks')
				.where('id', '==', args.id)
				.select(...sels)
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
	getFields = require('../helpers/fieldsHelper').getFields,
	StockType
}) => {
	const { GraphQLInt, GraphQLString, GraphQLList } = graphql
	const db = new Firestore(secrets)

	return {
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
	}
}
