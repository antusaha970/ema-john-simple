import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {

    const handleAddProduct = ()=>{
        fetch('https://ema-john-server.cyclic.app/addProduct',{
            method: 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fakeData)
        })
    }

    return (
        <div>
            <button onClick={handleAddProduct}>Add Product</button>
        </div>
    );
};

export default Inventory;