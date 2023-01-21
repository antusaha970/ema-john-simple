import React, { useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Products/Product';
import './Shop.css';


const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart,setCart] = useState([]);

    const handleAddToCart = (product) =>{
        const newCart = [...cart,product];
        setCart(newCart);
        const sameProductArray = newCart.filter(item => item.key === product.key);
        const count = sameProductArray.length;
        addToDatabaseCart(product.key,count);
    }


    return (
        <div className="shop-container">
            <div className="product-container">
                <ul>
                    {
                        products.map((product,index) => <Product showAddToCart={true} key={index} product = {product}  handleAddToCart= {handleAddToCart}></Product>)
                    }
                </ul>
            </div>
            <div className="cart-container">
                <Cart cart = {cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;