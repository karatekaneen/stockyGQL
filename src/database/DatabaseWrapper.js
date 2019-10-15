module.exports = class DatabaseWrapper {
	constructor(
		Firestore = require('@google-cloud/firestore'),
		secrets = require('../../secrets.json')
	) {
		this.db = new Firestore(secrets)
	}

	async getSummary() {
		const summary = await this.db
			.collection('stock-helpers')
			.doc('stockSummaries')
			.get()
		return summary.data()
	}

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

	async getByIds(idsToGet, fields) {
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
	}

	async getSingleById(id, fields) {
		const docArr = await this.getByIds([id], fields)
		return docArr[0]
	}
}
