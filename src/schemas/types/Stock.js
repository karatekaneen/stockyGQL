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
	getFields = require('../helpers/fieldsHelper').getFields,
	StockType
}) => {
	const { GraphQLInt, GraphQLString, GraphQLList } = graphql
	const db = new Firestore(secrets)

	return {
		type: new GraphQLList(StockType),
		args: {
			id: { type: GraphQLInt },
			name: { type: GraphQLString, description: 'Free text search of the "pretty" name' }
		},
		description: 'Root of stock object.',
		resolve: async (root, args, context, info) => {
			const output = []
			const fields = getFields(info)

			if (args.name) {
				const summaries = (await db
					.collection('stock-helpers')
					.doc('stockSummaries')
					.get()).data()
				const idsToGet = summaries.stocks
					.filter(stock => stock.name.toLowerCase().search(args.name.toLowerCase()) > -1)
					.map(stock => stock.id.toString())

				if (idsToGet.length > 0) {
					const docs = await Promise.all(
						idsToGet.map(id =>
							db
								.collection('stocks')
								.doc(id)
								.get()
						)
					)
					return docs.map(doc => doc.data())
				} else return []
			} else {
				const allDocs = await db
					.collection('stocks')
					.where('id', '>', 0)
					.select(...fields)
					.get()

				allDocs.forEach(doc => output.push(doc.data()))
				return output
			}
		}
	}
}
