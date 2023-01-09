import React from 'react';
import './Cart.css'
const Cart = (props) => {
    const cart = props.cart;

    const total = cart.reduce((total,pd)=> total+pd.price,0);

    let shippingPrice = 0;
    if(total > 35){
        shippingPrice = 15.99;
    }
    else if(total > 0){
        shippingPrice = 30.33;
    }
    const tax = total/10;

    const formatNumber = (num) => {
        return parseInt(num.toFixed(2));
    }

    const grandTotal = formatNumber(tax+shippingPrice+total);

    return (
        <div className='cart'>
            <h3>Order Summary</h3>
            <p>Item Ordered: {cart.length}</p>
            <div className="pricing">
                <p><small>Item :  ${formatNumber(total)}</small></p>
                <p><small>Shipping :  ${shippingPrice}</small></p>
                <p><small>Tax+VAT : ${formatNumber(tax)}</small></p>
                <h4>Ordered Total :  ${grandTotal} </h4>
            </div>
        </div>
    );
};

export default Cart;