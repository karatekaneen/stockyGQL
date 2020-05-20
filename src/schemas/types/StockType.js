exports.createStockType = ({
	graphql = require('graphql'),
	DataPoint = require('./DataPoint').createDataPoint(),
	DatabaseWrapper = require('../../database/DatabaseWrapper')
}) => {
	const { GraphQLInt, GraphQLString, GraphQLObjectType, GraphQLList } = graphql
	const db = new DatabaseWrapper()

	const StockType = new GraphQLObjectType({
		name: 'Stock',
		description: 'Basic stock object',

		fields: () => ({
			name: {
				type: GraphQLString,
				description: 'Pretty name',
				resolve: ({ name }) => name
			},

			id: {
				type: GraphQLInt,
				resolve: ({ id }) => id
			},

			linkName: {
				type: GraphQLString,
				resolve: ({ linkName }) => linkName,
				description: 'URL-safe version of company name.'
			},

			type: {
				type: GraphQLString,
				resolve: ({ type }) => type,
				description: 'Type of security'
			},

			list: {
				type: GraphQLString,
				resolve: ({ list }) => list,
				description: 'Name of the list that the stock belongs to such as "Large Cap Stockholm".'
			},

			priceData: {
				type: new GraphQLList(DataPoint),
				resolve: ({ id }) => db.getPriceData(id)
			}
		})
	})
	return StockType
}
