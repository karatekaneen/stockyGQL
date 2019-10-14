exports.createGetStockList = (
	Firestore = require('@google-cloud/firestore'),
	secrets = require('../../../secrets.json'),
	getFields = require('../helpers/fieldsHelper').getFields,
	DatabaseWrapper = require('../../database/DatabaseWrapper')
) => {
	const db = new Firestore(secrets)

	const getStockList = async (root, args, context, info) => {
		const output = []
		const dbWrapper = new DatabaseWrapper()

		// The top level fields to select from the database
		const fields = getFields(info)

		// Extract search algo to another file
		if (args.name || args.list) {
			const summaries = await dbWrapper.getSummary()
			const idsToGet = summaries.stocks
				.filter(stock => {
					const filterBy = []
					if (args.name) filterBy.push('name')
					if (args.list) filterBy.push('list')

					return filterBy.every(f => stock[f].toLowerCase().search(args[f].toLowerCase()) > -1)
				})
				.map(stock => stock.id.toString())

			if (idsToGet.length > 0) {
				const docs = await dbWrapper.getByIds(idsToGet)
				return docs
			} else return []
		} else {
			// Extract here
			const allStocks = await dbWrapper.getAllStocks(fields)
			return allStocks
		}
	}
	return getStockList
}
