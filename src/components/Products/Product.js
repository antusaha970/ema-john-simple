import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    const { name, img, seller, price, stock,key } = props.product;
    return (
        <div className='product' >
            <div className='product-img'>
                <img src={img} alt="" />
            </div>
            <div className='product-content'>
                
                <h3 className='product-title'> <Link to={`/product/${key}`} >{name}</Link> </h3>
                <p>By : {seller} </p>
                <p>$ {price} </p>
                <p>Only {stock} left in stock- Order Soon</p>
                {props.showAddToCart && <button className='main-button'  onClick={ ()=> props.handleAddToCart(props.product) } > <FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>}
            </div>
        </div>
    );
};

export default Product;