/**
 * Function to filter down a list of stocks by the arguments passed to the query.
 * It uses the AND operator, ie. that if both name and list is provided both args must match.
 *
 * @param {Object} args
 * @param {Array<Number>} args.id Optional array of ids
 * @param {String} args.name String to search for in the name of the stock
 * @param {String} args.list String to search for in the list of the stock
 * @param {Array<Object>} stocks List of stocks to search in
 * @returns {Array<Number>} Ids of the stocks to fetch
 */
exports.searchStocks = ({ id, name, list }, stocks) => {
	let matchingStocks = stocks

	if (id) {
		matchingStocks = matchingStocks.filter(stock => id.includes(stock.id))
	}

	if (name) {
		matchingStocks = matchingStocks.filter(
			stock => stock.name.toLowerCase().search(name.toLowerCase()) > -1
		)
	}

	if (list) {
		matchingStocks = matchingStocks.filter(
			stock => stock.list.toLowerCase().search(list.toLowerCase()) > -1
		)
	}

	const matchingIds = matchingStocks.map(stock => stock.id)
	return matchingIds
}
