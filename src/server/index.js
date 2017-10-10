let express = require('express')
let graphqlHTTP = require('express-graphql')

import {schema} from './lib/DbMockGraphql.js'

let app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*")
    res.header('Access-Control-Allow-Methods','GET,POST')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}))

app.listen(4000, () => console.log('localhost:4000'))

