const Firestore = require('@google-cloud/firestore')
const secrets = require('../../secrets.json')
const fields = ['id', 'name', 'priceData']

const db = new Firestore(secrets)
const allDocs = db
	.collection('stocks')
	.where('id', '==', 130828)
	.select(...fields)
	.get()
	.then(doc => {
		console.log(doc.docs[0].data())
		console.log(doc.docs[0].data().priceData.length)
	})
