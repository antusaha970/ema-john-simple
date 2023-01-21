import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Products/Product';

const ProductDetails = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey);
    console.log(product);
    return (
        <div>
            <Product product={product} showAddToCart = {false}></Product>
        </div>
    );
};

export default ProductDetails;