exports.createGetStockList = (
	getFields = require('../helpers/fieldsHelper').getFields,
	DatabaseWrapper = require('../../database/DatabaseWrapper')
) => {
	const getStockList = async (root, args, context, info) => {
		const db = new DatabaseWrapper()

		// The top level fields to select from the database
		const fields = getFields(info)

		// Extract search algo to another file
		if (args.name || args.list) {
			const summaries = await db.getSummary()
			const idsToGet = summaries.stocks
				.filter(stock => {
					const filterBy = []
					if (args.name) filterBy.push('name')
					if (args.list) filterBy.push('list')

					return filterBy.every(f => stock[f].toLowerCase().search(args[f].toLowerCase()) > -1)
				})
				.map(stock => stock.id)

			if (idsToGet.length > 0) {
				const docs = await db.getByIds(idsToGet, fields)
				return docs
			} else return []
		} else {
			// Extract here
			const allStocks = await db.getAllStocks(fields)
			return allStocks
		}
	}
	return getStockList
}

exports.createGetSingleStock = (
	getFields = require('../helpers/fieldsHelper').getFields,
	DatabaseWrapper = require('../../database/DatabaseWrapper')
) => {
	const getSingleStock = async (root, args, context, info) => {
		const db = new DatabaseWrapper()
		const fields = getFields(info)

		const stock = await db.getSingleById(args.id, fields)
		return stock
	}
	return getSingleStock
}
