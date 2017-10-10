import React from 'react'
import { Component } from 'react'
import ProductStore from "../stores/ProductStore.jsx"

export default class Grid extends Component {

    constructor(props) {
        super(props)
        this.name = this.props.name
        this.state = {
            products: ProductStore.getAll(),
        }
    }

    componentWillMount() {
        ProductStore.on("change", () => {
            this.getProducts()
        })
    }

    componentWillUnmount() {
        ProductStore.removeListener("change", () => {
            this.getProducts()
        })
    }

    getProducts() {
        this.setState({
            products: ProductStore.getAll(),
        })
    }

    render() {
        let ProductRows = []

        if (this.state.products.length) {
            ProductRows = this.state.products.map((el) => {
                return <tr key={el.id}>
                    <td>{el.id}</td>
                    <td>{el.supplier.name}</td>
                    <td>{el.product.name}</td>
                    <td>{el.price}</td>
                </tr>
            })
        }

        return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Supplier</th>
                    <th>Product</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                    {ProductRows}
                </tbody>
            </table>
        )
    }
}