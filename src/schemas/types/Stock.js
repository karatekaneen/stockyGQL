exports.createStock = ({
	Firestore = require('@google-cloud/firestore'),
	secrets = require('../../../secrets.json'),
	graphql = require('graphql'),
	getFields = require('../helpers/fieldsHelper').getFields
}) => {
	const { GraphQLInt, GraphQLString, GraphQLObjectType } = graphql

	const db = new Firestore(secrets)

	const StockType = new GraphQLObjectType({
		name: 'Stockinternal',
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
