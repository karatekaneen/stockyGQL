exports.createStockType = ({
	graphql = require('graphql'),
	DataPoint = require('./DataPoint').createDataPoint({})
}) => {
	const { GraphQLInt, GraphQLString, GraphQLObjectType, GraphQLList } = graphql

	const StockType = new GraphQLObjectType({
		name: 'Stock',
		description: 'Basic stock object',

		fields: () => ({
			name: {
				type: GraphQLString,
				description: 'Pretty name',
				resolve: data => data.name
			},
			id: {
				type: GraphQLInt,
				resolve: data => data.id
			},
			lastPricePoint: {
				type: GraphQLString,
				resolve: data => new Date(data.lastPricePoint).toISOString(),
				description:
					'DateTime of the last entry to the priceseries. Its a javascript date object converted to a string.'
			},
			linkName: {
				type: GraphQLString,
				resolve: data => data.linkName,
				description: 'URL-safe version of company name.'
			},
			list: {
				type: GraphQLString,
				resolve: data => data.list,
				description: 'Name of the list that the stock belongs to such as "Large Cap Stockholm".'
			},
			priceData: {
				type: new GraphQLList(DataPoint),
				resolve: data => data.priceData
			}
		})
	})
	return StockType
}
