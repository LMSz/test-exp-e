import React from 'react';
import ReactDOM from 'react-dom';
import Dropdown from './components/Dropdown.jsx';
import Grid from './components/Grid.jsx';

ReactDOM.render(
    <Dropdown name="product" />,
    document.getElementById('productDropdownId')
);
ReactDOM.render(
    <Dropdown name="supplier" />,
    document.getElementById('supplierDropdownId')
);
ReactDOM.render(
    <Grid name="price" />,
    document.getElementById('pricesGridId')
);

