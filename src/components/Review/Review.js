import React, { useEffect } from 'react';
import { useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImg from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [isPlaced, setIsPlaced] = useState(false);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const keys = Object.keys(savedCart);
        const cartProducts = keys.map(key => {
            const product = fakeData.find(item => item.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, [])

    const removePd = (productKey) => {
        const newCart = cart.filter(item => item.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    const handlePlacedOrder = ()=>{
        setCart([]);
        processOrder();
        setIsPlaced(true);
    } 
    let orderImg;
    if(isPlaced){
        orderImg = <img src={happyImg} alt="" />
    }
    return (
        <div className='flex-container'>
            <div className="product-container">
                <h1>Total items : {cart.length} </h1>
                {
                    cart.map(product => <ReviewItem key={product.key} product={product} removePd={removePd}></ReviewItem>)
                }
                {
                    orderImg
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button className='main-button' onClick={handlePlacedOrder}>Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;