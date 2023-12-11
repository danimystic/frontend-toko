import React from 'react';
import PropTypes from 'prop-types';
import Product from './Product';
import styles from './ProductList.module.css';

const ProductList = ({ products }) => (
    <div className={styles.productList}>
        {products.map((product) => (
            <Product key={product.id} {...product} />
        ))}
  </div>
);

ProductList.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProductList;
