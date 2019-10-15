exports.createSingleStock = ({
	graphql = require('graphql'),
	getSingleStock = require('../resolvers/dbResolvers').createGetSingleStock(),
	StockType
}) => {
	const { GraphQLInt, GraphQLNonNull, GraphQLList } = graphql

	return {
		type: StockType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLInt) }
		},
		description: 'Fetches single stock by ID.',
		resolve: getSingleStock
	}
}

exports.createStockList = ({
	graphql = require('graphql'),
	getStockList = require('../resolvers/dbResolvers').createGetStockList(),
	StockType
}) => {
	const { GraphQLInt, GraphQLString, GraphQLList } = graphql

	return {
		type: new GraphQLList(StockType),
		args: {
			id: { type: new GraphQLList(GraphQLInt) },
			name: { type: GraphQLString, description: 'Free text search of the "pretty" name' },
			list: { type: GraphQLString, description: 'Free text search of the list title' }
		},
		description: 'Get list of stocks.',
		resolve: getStockList
	}
}
