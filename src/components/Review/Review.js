import React, { useEffect } from 'react';
import { useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImg from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [isPlaced, setIsPlaced] = useState(false);
    const history = useHistory();


    useEffect(() => {
        const savedCart = getDatabaseCart();
        const keys = Object.keys(savedCart);
        fetch('http://localhost:5000/getProductsByKeys', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(keys)
        })
        .then(res =>  res.json())
        .then(data => {
            setCart(data);
        })
    }, [])

    const removePd = (productKey) => {
        const newCart = cart.filter(item => item.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    const handleProceedOrder = () => {
        history.push('/shipment');
    }
    let orderImg;
    if (isPlaced) {
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
                    <button className='main-button' onClick={handleProceedOrder}>Proceed Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;