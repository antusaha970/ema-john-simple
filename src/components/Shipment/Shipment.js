import React, { useContext } from 'react';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/fakedb';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(loggedInUser);

    const handleSubmit = (e) => {
        const cartProduct = getDatabaseCart();
        const deliveryInfo = {
            address: document.getElementById('address').value,
            number: document.getElementById('mobile').value,
            name: document.getElementById('name').value,
        }
        const orderDetails = {
            ...loggedInUser,products:cartProduct,shipmentDate:  new Date(),...deliveryInfo,
        }

        fetch('https://ema-john-server.cyclic.app/saveOrder',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(orderDetails)
        })
        .then(response => response.json())
        .then(data => {
            if(data){
                processOrder();
            }
        });

        e.preventDefault();
    }

    return (
        <div>
           <form onSubmit={handleSubmit}>
            <input type="text" name="name" id="name" placeholder='Enter your name'  required/>
            <br />
            <input type="email" name="email" id="email" defaultValue={loggedInUser.email} required/>
            <br />
            <input type="text" name="address" id="address" placeholder='Enter your Address' required/>
            <br />
            <input type="tel" name='mobile' id='mobile' placeholder='Enter your mobile number'required/>
            <br />
            <input type="submit" value='submit' readOnly/>
           </form>
        </div>
    );
};

export default Shipment;