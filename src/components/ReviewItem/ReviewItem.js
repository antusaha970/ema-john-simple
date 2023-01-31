import React from 'react';

const ReviewItem = (props) => {
    const { name, quantity,key,price } = props.product;
    const reviewItemStyle = {
        marginLeft: '100px',
        borderBottom: '1px solid lightgrey',
        paddingBottom: '10px',
        marginBottom: '10px'
    }


    return (
        <div style={reviewItemStyle}>
            <h4 className='product-title'>{name}</h4>
            <p>Quantity : {quantity}</p>
            <p><small>$ {price}</small></p>
            <button className='main-button'  onClick={() => props.removePd(key)}> Remove Item</button>
        </div>
    );
};

export default ReviewItem;