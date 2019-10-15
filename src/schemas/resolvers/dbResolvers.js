/**
 * Factory function for the getStockList resolver.
 *
 * @param {Function} getFields To extract what fields requested in the query
 * @param {Class} DatabaseWrapper To handle all the db functions
 * @param {Function} searchStocks To filter all the stocks by the args provided.
 * @returns {Function} getStockList
 */
exports.createGetStockList = (
	getFields = require('../helpers/fieldsHelper').getFields,
	DatabaseWrapper = require('../../database/DatabaseWrapper'),
	searchStocks = require('../helpers/stockSearcher').searchStocks
) => {
	/**
	 * Resolver function to get list of stocks.
	 * Searches by all the parameters given and fetches only the fields needed to minimize data usage.
	 *
	 * @param {Object} root
	 * @param {Object} args Arguments provided in the query
	 * @param {Object} context
	 * @param {Object} info Information about the fields requested etc.
	 * @returns {Array<Object>} List of stocks
	 */
	const getStockList = async (root, args, context, info) => {
		const db = new DatabaseWrapper()

		// The top level fields to select from the database
		const fields = getFields(info)

		if (args.name || args.list || args.id) {
			// Fetch data about all the stocks
			const { stocks } = await db.getSummary()

			// Filter all the stocks based on all the args
			const idsToGet = searchStocks(args, stocks)

			if (idsToGet.length > 0) {
				// Fetch the docs that matches all the args
				const docs = await db.getByIds(idsToGet, fields)
				return docs
			} else return []
		} else {
			// If no arguments given, fetch all stocks with given fields
			const allStocks = await db.getAllStocks(fields)
			return allStocks
		}
	}
	return getStockList
}

/**
 * Factory function for getSingleStock
 * @param {Function} getFields To extract what fields requested in the query
 * @param {Class} DatabaseWrapper To handle all the db functions
 * @returns {Function} getSingleStock
 */
exports.createGetSingleStock = (
	getFields = require('../helpers/fieldsHelper').getFields,
	DatabaseWrapper = require('../../database/DatabaseWrapper')
) => {
	/**
	 * Resolve function to get a single stock with the fields specified in the query.
	 *
	 * @param {Object} root
	 * @param {Object} args Arguments provided with the query
	 * @param {number} args.id Id of the stock to get
	 * @param {Object} context
	 * @param {Object} info Information about the fields requested etc.
	 */
	const getSingleStock = async (root, args, context, info) => {
		const db = new DatabaseWrapper()

		const fields = getFields(info)
		const stock = await db.getSingleById(args.id, fields)

		return stock
	}
	return getSingleStock
}
