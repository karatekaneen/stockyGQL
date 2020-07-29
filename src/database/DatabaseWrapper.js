/** Wrapper for database functions */
class DatabaseWrapper {
	/**
	 * Creates an instance of the database wrapper
	 * @param {Class} Firestore The Firestore library
	 */
	constructor(
		Firestore = require('@google-cloud/firestore')
		// secrets = require('../../secrets.json')
	) {
		// this.db = new Firestore(secrets)
		this.db = new Firestore()
	}

	async getPriceData(id) {
		const doc = await this.db
			.collection('prices')
			.doc(id.toString())
			.get()

		if (!doc.exists) {
			return null
		}
		return doc.data().priceData
	}

	async searchStocks({ id, name, list, type }) {
		const dbCollection = this.db.collection('securities')
		let query = dbCollection

		console.log({ id })
		if (id) {
			query = query.where('id', 'in', Array.isArray(id) ? id : [id])
		}

		if (name) {
			query = query.where('name', '==', name)
		}

		if (list) {
			query = query.where('list', '==', list)
		}

		if (type) {
			query = query.where('type', '==', type.toLowerCase())
		}

		const snapshot = await query.get()
		const output = []
		if (snapshot.empty) {
			return output
		}

		snapshot.forEach(doc => output.push(doc.data()))
		return output
	}
}

module.exports = DatabaseWrapper
