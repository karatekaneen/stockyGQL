/** Wrapper for database functions */
class DatabaseWrapper {
	/**
	 * Creates an instance of the database wrapper
	 * @param {Class} Firestore The Firestore library
	 * @param {Object} secrets Credentials to Firestore
	 */
	constructor(
		Firestore = require('@google-cloud/firestore'),
		secrets = require('../../secrets.json')
	) {
		this.db = new Firestore(secrets)
	}

	/**
	 * Gets the summary document from the database with info such as name and list of each stock.
	 * @returns {Object} Object with information about each stock
	 */
	async getSummary() {
		const summary = await this.db
			.collection('stock-helpers')
			.doc('stockSummaries')
			.get()
		return summary.data()
	}

	/**
	 * Fetches all the stocks and the fields specified. If no fields are specified all will be fetched.
	 * @param {Array<String>} fields The fields that should be fetched from the database
	 * @returns {Array<Object} Array of stocks
	 */
	async getAllStocks(fields = []) {
		const output = []
		if (fields.length > 0) {
			const allDocs = await this.db
				.collection('stocks')
				.where('id', '>', 0)
				.select(...fields)
				.get()

			allDocs.forEach(doc => output.push(doc.data()))
		} else {
			const allDocs = await this.db.collection('stocks').get()

			allDocs.forEach(doc => output.push(doc.data()))
		}
		return output
	}

	/**
	 * Fetches stocks by Id and the fields specified. If no fields are specified all will be fetched.
	 * @param {Array<Number>} idsToGet
	 * @param {Array<String>} fields The fields that should be fetched from the database
	 * @returns {Array<Object} Array of stocks
	 */
	async getByIds(idsToGet, fields = []) {
		if (fields.length > 0) {
			const snapshots = await Promise.all(
				idsToGet.map(id =>
					this.db
						.collection('stocks')
						.where('id', '==', id)
						.select(...fields)
						.get()
				)
			)
			return snapshots.map(snapshot => snapshot.docs[0].data())
		} else {
			const snapshots = await Promise.all(
				idsToGet.map(id =>
					this.db
						.collection('stocks')
						.where('id', '==', id)
						.get()
				)
			)
			return snapshots.map(snapshot => snapshot.docs[0].data())
		}
	}

	/**
	 * Fetches single stock by id from the database with the fields provided.
	 * @param {Number} id
	 * @param {Array<String>} fields The fields that should be fetched from the database
	 * @returns {Object} A single stock
	 */
	async getSingleById(id, fields) {
		const docArr = await this.getByIds([id], fields)
		return docArr[0]
	}
}

module.exports = DatabaseWrapper
