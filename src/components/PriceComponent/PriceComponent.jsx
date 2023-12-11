import React from 'react';

const PriceComponent = ({ price }) => {
    const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(price);

    return <p>{formattedPrice}</p>
};

export default PriceComponent;
