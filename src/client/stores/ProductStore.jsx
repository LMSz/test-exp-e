import dispatcher from "../components/Dispatcher.jsx"
import { EventEmitter } from "events"
import axios from 'axios'

class ProductStore extends EventEmitter {

    constructor() {
        super()
        this.selecteds = {
            product: 0,
            supplier: 0,
        };
        this.products = []
    }

    getAll() {
        if (!this.products.length
            && (
                this.selecteds.product === 0
                && this.selecteds.supplier === 0
            )
        ) {
            this.loadProducts(null);
        }

        return this.products
    }

    loadProducts(action) {

        let filter = '';

        if (action) {
            this.selecteds[action.name] = action.selected

            if (this.selecteds.product > 0
                || this.selecteds.supplier > 0
            ) {
                filter = '(';
                if (this.selecteds.supplier > 0) {
                    filter += 'supplierId: ' + this.selecteds.supplier
                }
                if (this.selecteds.product > 0) {
                    filter += 'productId: ' + this.selecteds.product + ' '
                }
                filter += ')'
            }
        }

        let queryStr = `{
            price ${filter} {
                id,
                price
                supplier {
                    name
                }
                product {
                    name
                }
            }
        }`

        axios
            .get(`http://localhost:4000/graphql?query=${encodeURI(queryStr)}`)
            .then(res => {
                if (res.data.data['price'][0]) {
                    this.products = res.data.data['price']
                } else {
                    this.products = []
                }
                this.emit("change")
            })
    }

    handleActions(action) {
        switch(action.type) {
            case "LOAD_PRODUCTS": {
                this.loadProducts(action)
                break
            }
        }
    }
}


const productStore = new ProductStore
dispatcher.register(productStore.handleActions.bind(productStore))
export default productStore