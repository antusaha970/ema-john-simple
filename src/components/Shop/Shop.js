import React, { useState } from 'react';
import { useEffect } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Products/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, [])

    const [cart, setCart] = useState([]);

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
        // if (products.length > 0) {
        //     const previousProducts = keys.map(key => {
        //         const product = products.find(product => product.key === key);
        //         product.quantity = savedCart[key];
        //         return product;
        //     });
        //     setCart(previousProducts);
        // }
    }, []);

    const handleAddToCart = (product) => {
        let count = 1;
        let newCart;
        const toBeAdded = product.key;
        const sameProduct = cart.find(item => item.key === toBeAdded);
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            newCart = [...cart, sameProduct];
        }
        else {
            product.quantity = count;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }


    return (
        <div className="flex-container">
            <div className="product-container">
                <ul>
                    {
                        products.map((product, index) => <Product showAddToCart={true} key={index} product={product} handleAddToCart={handleAddToCart}></Product>)
                    }
                </ul>
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to={'/review'}><button className='main-button'>Review your order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;