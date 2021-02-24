import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import CheckoutItem from '../common/CheckoutItem';
import Icofont from 'react-icofont';

import { useAuth } from '../../contexts/AuthContext';
function Cart(props) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [cartData, setCartData] = React.useState([]);
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [recievedData, setRecievedData] = React.useState(false);
    const [cartItem, setCartItem] = React.useState();
    const { uid, token } = JSON.parse(localStorage.getItem('userData'));
    const { cartUpdated, updateCart } = useAuth();
    const getQty = React.useCallback(
        async ({ id, quantity, price }) => {
            const item = {
                name: id,
                quantity: quantity,
                price: price,
            };

            const result = await axios.post(
                `http://localhost:3030/api/users/cart/add`,
                {
                    item: item,
                    uid: uid,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            if (result) {
                props.setCartUpdated(Math.random());
            }
        },
        [props, token, uid]
    );
    React.useEffect(() => {
        try {
            if (userData) {
                setTotalPrice(0);
                const fetchData = async () => {
                    const result = await axios.post(
                        `http://localhost:3030/api/users/cart/get`,
                        {
                            uid: userData.uid,
                        },
                        {
                            headers: { Authorization: userData.token },
                        }
                    );

                    if (result.data) {
                        let tprice = 0;
                        setCartData(result.data);
                        for (let item of result.data) {
                            tprice += item.quantity * item.price;
                            setTotalPrice(tprice);
                        }

                        setRecievedData(true);
                    } else {
                        console.log('error');
                    }
                };

                fetchData();
            }
        } catch (err) {
            console.log(err);
        }
    }, [userData, cartUpdated]);

    React.useEffect(() => {
        if (recievedData) {
            setCartItem(
                cartData.map((item) => {
                    console.log(item);
                    return (
                        <CheckoutItem
                            itemName={`${item.name}`}
                            price={item.price}
                            priceUnit="₹"
                            id={item.name}
                            qty={item.quantity}
                            show={true}
                            getValue={getQty}
                        />
                    );
                })
            );
            setRecievedData(false);
        }
    }, [getQty, cartData, recievedData]);

    return (
        <div className="generator-bg rounded shadow-sm mb-4 p-4 osahan-cart-item">
            <h5 className="mb-1 text-white">Your Order</h5>
            <p className="mb-4 text-white">{cartData.length} Items</p>
            <div className="bg-white rounded shadow-sm mb-2">{cartItem}</div>
            <div className="mb-2 bg-white rounded p-2 clearfix">
                <Image fluid className="float-left" src="/img/wallet-icon.png" />
                <h6 className="font-weight-bold text-right mb-2">
                    Subtotal : <span className="text-danger">₹{totalPrice}</span>
                </h6>
                <p className="seven-color mb-1 text-right">Extra charges may apply</p>
            </div>
            <Link to="/checkout" className="btn btn-success btn-block btn-lg">
                Checkout
                <Icofont icon="long-arrow-right" />
            </Link>
            <div className="pt-2"></div>
            <div className="pt-2"></div>
        </div>
    );
}

export default Cart;
