exports.createSchema = ({
	graphql = require('graphql'),
	Stock = require('./types/Stock'),
	StockType = require('./types/StockType').createStockType({})
}) => {
	const { GraphQLSchema, GraphQLObjectType } = graphql

	return new GraphQLSchema({
		query: new GraphQLObjectType({
			name: 'Query',
			description: 'Basic stock query.',

			fields: () => ({
				stocks: Stock.createStockList({ StockType }),
				stock: Stock.createSingleStock({ StockType })
			})
		})
	})
}
