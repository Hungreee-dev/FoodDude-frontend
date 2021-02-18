import React from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import CheckoutItem from '../common/CheckoutItem';
import Icofont from 'react-icofont';

// import { BaseUrl2 } from '../../BaseUrl';
// import { useAuth } from '../../contexts/AuthContext';
import { useOrder } from '../../contexts/OrderContext';
//import {BaseUrl} from '../BaseUrl'
function Cart(props) {
    // const [cartData, setCartData] = React.useState([]);
    // const [totalPrice, setTotalPrice] = React.useState(0);
    // const [recievedData, setRecievedData] = React.useState(false);
    // const { cartUpdated, updateCart } = useAuth();
    // const [cartItem, setCartItem] = React.useState();
    const { cartItems, total } = useOrder();

    return (
        <>
            <div className="generator-bg rounded shadow-sm mb-4 p-4 osahan-cart-item">
                <h5 className="mb-1 text-white">Your Order</h5>
                <p className="mb-4 text-white">{cartItems.length} Items</p>
                <div className="bg-white rounded shadow-sm mb-2">
                    {cartItems.map((item) => {
                        // console.log(item);
                        return (
                            <CheckoutItem
                                itemName={`${item.name}`}
                                price={item.price}
                                priceUnit="₹"
                                id={item.name}
                                qty={item.quantity}
                                veg={
                                    item.name.toLowerCase().includes('chicken') ||
                                    item.name.toLowerCase().includes('fish') ||
                                    item.name.toLowerCase().includes('mutton')
                                }
                                show={true}
                                diabled={true}
                                getValue={() => {}}
                                key={item.name}
                            />
                        );
                    })}
                </div>
                <div className="mb-2 bg-white rounded p-2 clearfix">
                    <Image fluid className="float-left" src="/img/wallet-icon.png" />
                    <h6 className="font-weight-bold text-right mb-2">
                        Subtotal : <span className="text-danger">₹{total}</span>
                    </h6>
                    <p className="seven-color mb-1 text-right">Extra charges may apply</p>
                    {/* <p className="text-black mb-0 text-right">You have saved $955 on the bill</p> */}
                </div>
                <Link to="/checkout" className="btn btn-success btn-block btn-lg">
                    Checkout
                    <Icofont icon="long-arrow-right" />
                </Link>
                <div className="pt-2"></div>
                {/* <div className="alert alert-success" role="alert">
      You have saved <strong>$1,884</strong> on the bill
   </div> */}
                <div className="pt-2"></div>
            </div>
        </>
    );
}

export default Cart;
