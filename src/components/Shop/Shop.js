import React, { useState } from 'react';
import { useEffect } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Products/Product';
import './Shop.css';


const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart,setCart] = useState([]);

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const keys = Object.keys(savedCart);
        const previousProducts = keys.map(key => {
            const product = fakeData.find(product => product.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(previousProducts);
    },[])

    const handleAddToCart = (product) =>{
        let count = 1;
        let newCart;
        const toBeAdded = product.key;
        const sameProduct = cart.find(item => item.key === toBeAdded);
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            newCart = [...cart,sameProduct];
        }
        else{
            product.quantity = count;
            newCart = [...cart,product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key,count);
    }


    return (
        <div className="flex-container">
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