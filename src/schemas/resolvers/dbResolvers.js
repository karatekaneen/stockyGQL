/**
 * Factory function for the getStockList resolver.
 *
 * @param {Class} DatabaseWrapper To handle all the db functions
 * @returns {Function} getStockList
 */
exports.createGetStockList = (DatabaseWrapper = require('../../database/DatabaseWrapper')) => {
	/**
	 * Resolver function to get list of stocks.
	 *
	 * @param {Object} root
	 * @param {Object} args Arguments provided in the query
	 * @param {Object} context
	 * @param {Object} info Information about the fields requested etc.
	 * @returns {Array<Object>} List of stocks
	 */
	const getStockList = async (root, args, context, info) => {
		const db = new DatabaseWrapper()
		const docs = await db.searchStocks(args)

		return docs
	}
	return getStockList
}

/**
 * Factory function for getSingleStock
 * @param {Function} getFields To extract what fields requested in the query
 * @param {Class} DatabaseWrapper To handle all the db functions
 * @returns {Function} getSingleStock
 */
exports.createGetSingleStock = (DatabaseWrapper = require('../../database/DatabaseWrapper')) => {
	/**
	 * Resolve function to get a single stock with the fields specified in the query.
	 *
	 * @param {Object} root
	 * @param {Object} args Arguments provided with the query
	 * @param {number} args.id Id of the stock to get
	 * @param {Object} context
	 * @param {Object} info Information about the fields requested etc.
	 */
	const getSingleStock = async (root, { id }, context, info) => {
		const db = new DatabaseWrapper()
		const stock = await db.searchStocks({ id })

		return stock[0] || null
	}
	return getSingleStock
}
