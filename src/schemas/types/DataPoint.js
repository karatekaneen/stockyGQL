exports.createDataPoint = ({ graphql = require('graphql') } = {}) => {
	const { GraphQLInt, GraphQLString, GraphQLObjectType, GraphQLFloat } = graphql

	const StockType = new GraphQLObjectType({
		name: 'DataPoint',
		description: 'Data point for the time series. OHLCV+ data.',

		fields: () => ({
			open: {
				type: GraphQLFloat,
				description: 'Open price',
				resolve: data => data.open
			},
			high: {
				type: GraphQLFloat,
				description: 'Highest price',
				resolve: data => data.high
			},
			low: {
				type: GraphQLFloat,
				description: 'Lowest price',
				resolve: data => data.low
			},
			close: {
				type: GraphQLFloat,
				description: 'Close price',
				resolve: data => data.close
			},
			volume: {
				type: GraphQLInt,
				description: 'Number of stocks traded',
				resolve: data => data.volume
			},
			owners: {
				type: GraphQLInt,
				description: 'Number of owners of the stock on Avanza.',
				resolve: data => data.owners
			},
			date: {
				type: GraphQLString,
				description: 'Date of the data',
				resolve: data => new Date(data.date).toISOString()
			}
		})
	})
	return StockType
}
