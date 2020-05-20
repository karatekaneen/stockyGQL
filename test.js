fetch('http://localhost:4000/graphql?', {
	credentials: 'omit',
	headers: {
		'User-Agent':
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:69.0) Gecko/20100101 Firefox/69.0',
		Accept: 'application/json',
		'Accept-Language': 'sv-SE,sv;q=0.8,en-US;q=0.5,en;q=0.3',
		'Content-Type': 'application/json',
		Pragma: 'no-cache',
		'Cache-Control': 'no-cache'
	},
	referrer: 'http://localhost:4000/',
	body: {"query":"{\\n  stocks( list: \\"large\\") {\\n    name\\n  }\\n}\\n","variables":null},
	method: 'POST',
	mode: 'cors'
})


