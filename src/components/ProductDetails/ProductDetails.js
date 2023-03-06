import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Products/Product';
import { useState } from 'react';

const ProductDetails = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({});
    useEffect(()=>{
        fetch(`https://ema-john-server.cyclic.app/product/${productKey}`)
        .then(res => res.json())
        .then(data => {
            setProduct(data);
        });
    },[])
    return (
        <div>
            <Product product={product} showAddToCart = {false}></Product>
        </div>
    );
};

export default ProductDetails;