import { find, filter } from 'lodash'
import { makeExecutableSchema } from 'graphql-tools'

let typeDefs = `
    type Supplier {
        id: ID
        name: String
    }
    type Product {
        id: ID!
        name: String!
    }
    type Price {
        id: ID
        supplier: Supplier
        product: Product
        price: Float!
    }
    # the schema allows the following query:
    type Query {
        products: [Product]
        suppliers: [Supplier]
        price(supplierId: Int, productId: Int): [Price]
    }
`

let suppliers = [
    { id: 1, name: 'New Co Ltd' },
    { id: 2, name: 'Old Co Ltd' },
]
let products = [
    { id: 1, name: 'Mini wongle' },
    { id: 2, name: 'Small wongle' },
    { id: 3, name: 'Large wongle' },
    { id: 4, name: 'Super wongle' },
]
let prices = [
    { id: 1, supplier: 1, product: 2, price: 5 },
    { id: 2, supplier: 1, product: 3, price: 8 },
    { id: 3, supplier: 1, product: 4, price: 12 },
    { id: 4, supplier: 2, product: 1, price: 4 },
    { id: 5, supplier: 2, product: 2, price: 6 },
    { id: 6, supplier: 2, product: 3, price: 9 },
    { id: 7, supplier: 2, product: 4, price: 13 },
]

const resolvers = {
    Query: {
        suppliers: () => suppliers,
        products: () => products,
        price: (_, params) => {
            let ret;
            if (params.supplierId
                && params.productId
            ) {
                ret = [ find(prices, {supplier: params.supplierId, product: params.productId}) ]
            } else if (params.supplierId) {
                ret = filter(prices, {supplier: params.supplierId})
            } else if (params.productId) {
                ret = filter(prices, {product: params.productId})
            } else {
                ret = prices
            }
            return ret
        }
    },
    Price: {
        supplier: (params) => {
            return filter(suppliers, { id: params.supplier })[0]
        },
        product: (params) => {
            return filter(products, { id: params.product })[0]
        }
    }
}

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})
