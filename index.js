const express = require('express')
const graphqlHTTP = require('express-graphql')
const { createSchema } = require('./src/schemas/schema')
const schema = createSchema({})

const root = { hello: () => 'Hello world!' }

const PORT = process.env.port || 8080

const app = express()
app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true
	})
)
app.listen(PORT, () => console.log(`Serving on host:${PORT}/graphql`))
