import React from 'react'
import Loader from './Loader.jsx'
import dispatcher from "./Dispatcher.jsx"

export default class Dropdown extends Loader {

    constructor(props) {
        super(props)
        this.name = this.props.name
        this.title = this.name.charAt(0).toUpperCase() + this.name.slice(1)
        this.selected = 0
        this.data = [
            { id: 0, name: 'Please choose!' }
        ]
        this.onChange = this.onChange.bind(this)
    }

    onChange(event) {
        this.selected = event.target.value
        dispatcher.dispatch({
            type: "LOAD_PRODUCTS",
            name: this.name,
            selected: this.selected
        });
    }

    componentWillMount() {
        this.loadDropdownData()
    }

    render() {
        return (
            <div>
                <label for={'id' + this.title}>{ this.title }</label>
                <select
                    id={'id' + this.title}
                    className="form-control"
                    onChange={this.onChange}
                >
                    {this.data.map(el =>
                        <option key={el.id} value={el.id}>{el.name}</option>
                    )}
                </select>
            </div>
        )
    }
}