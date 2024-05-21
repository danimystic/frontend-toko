import React from 'react';
import PropTypes from 'prop-types';
import PriceComponent from '../PriceComponent/PriceComponent';
import styles from './Product.module.css';
import {Link} from "react-router-dom";

const Product = ({ productId, name, category, gender, imageUrl, price }) => (
  <Link to={`/products/${productId}`} className={styles.product}>
    <img src={imageUrl} alt={name} className={styles.imageProduct} />
    <div className="product-details">
      <h3>{name}</h3>
      <p style={{color:'#888'}}>{gender}'s {category}</p>
      <p style={{color:'#f22e52', fontWeight:'bold'}}><PriceComponent price={price}/></p>
    </div>
  </Link>
);

Product.propTypes = {
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

export default Product;
