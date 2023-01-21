import React, { useEffect } from 'react';
import { useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart } from '../../utilities/fakedb';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart, setCart] = useState([]);
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const keys = Object.keys(savedCart);
        const cartProducts = keys.map(key => {
            const product = fakeData.find(item => item.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    },[])

return (
    <div>
        <h1>This is review component {cart.length} </h1>
        {
            cart.map(product => <ReviewItem key={product.key} product={product}></ReviewItem> )
        }
    </div>
);
};

export default Review;