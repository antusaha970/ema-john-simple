import React from 'react';

const ReviewItem = (props) => {
    const { name, quantity } = props.product;
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
            <button className='main-button'>Remove Item</button>
        </div>
    );
};

export default ReviewItem;