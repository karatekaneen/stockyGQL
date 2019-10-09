const Firestore = require('@google-cloud/firestore')
const secrets = require('../../secrets.json')
const fields = ['id', 'name', 'priceData']

const allStocks = require('./allstocks.json')

const s = 'aTlaaaas hennes'
console.log(s.toLowerCase().search('hennsades'))
// const db = new Firestore(secrets)
// db.collection('stock-helpers')
// 	.doc('stockSummaries')
// 	.set(allStocks.data)
// 	.then(() => console.log('done'))
// 	.catch(err => console.log(err))
// // const allDocs = db
// // 	.collection('stocks')
// // 	.where('id', '==', 130828)
// // 	.select(...fields)
// // 	.get()
// // 	.then(doc => {
// // 		console.log(doc.docs[0].data())
// // 		console.log(doc.docs[0].data().priceData.length)
// // 	})
