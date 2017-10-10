import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import { uniqBy } from 'lodash';

export default class Loader extends Component {

    loadDropdownData(name) {
        let queryStr = `{
            ${this.name}s {
                id,
                name
            }
        }`

        axios
            .get(`http://localhost:4000/graphql?query=${encodeURI(queryStr)}`)
            .then(res => {
                this.data = uniqBy([...this.data, ...res.data.data[this.name+'s']], 'id');
                this.setState({
                    loaded : true
                })
            });
    }
}
