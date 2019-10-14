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

	async getByIds(idsToGet) {
		const docs = await Promise.all(
			idsToGet.map(id =>
				this.db
					.collection('stocks')
					.doc(id)
					.get()
			)
		)
		return docs.map(doc => doc.data())
	}

	async getSingleById(id) {
		const docArr = await this.getByIds([id])
		return docArr[0]
	}
}
