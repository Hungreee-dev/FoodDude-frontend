import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { NavDropdown, Button } from 'react-bootstrap';
import DropDownTitle from '../common/DropDownTitle';
import CartDropdownHeader from '../cart/CartDropdownHeader';
import CartDropdownItem from '../cart/CartDropdownItem';
import { useAuth } from '../../contexts/AuthContext';
import { useOrder } from '../../contexts/OrderContext';
import { BaseUrl2 } from '../../BaseUrl';
import Spinner from '../Spinner/index';
const asyncLocalStorage = {
    setItem: async function (key, value) {
        return Promise.resolve().then(function () {
            localStorage.setItem(key, value);
        });
    },
    getItem: async function (key) {
        return Promise.resolve().then(function () {
            return localStorage.getItem(key);
        });
    },
    removeItem: async function (key) {
        return Promise.resolve().then(function () {
            return localStorage.getItem(key);
        });
    },
};
export default function Cart(props) {
    // const [cartData, setCartData] = React.useState([]);
    const { setUVP } = useAuth();
    // const [totalPrice, setTotalPrice] = React.useState(0);
    const { cartItems, total, setCart } = useOrder();
    const [loading, setLoading] = useState(false);
    const { logout } = useAuth();

    // const getQty = React.useCallback(
    //     async ({ id, quantity, price }) => {
    //         try {
    //             const userData = JSON.parse(localStorage.getItem('userData'));

    //             const item = {
    //                 name: id,
    //                 quantity: quantity,
    //                 price: price,
    //             };
    //             // console.log(item);
    //             setLoading(true);
    //             await axios.post(
    //                 `${BaseUrl2}/api/users/cart/add`,
    //                 {
    //                     item: item,
    //                     uid: userData.uid,
    //                 },
    //                 {
    //                     headers: {
    //                         Authorization: userData.token,
    //                     },
    //                 }
    //             );
    //             let newdata = [...cartItems];
    //             // console.log(newdata);
    //             if (quantity === 0) {
    //                 newdata = newdata.filter((ele) => ele.name !== id);
    //             } else {
    //                 const index = newdata.findIndex((ele) => ele.name === id);
    //                 if (index !== -1) {
    //                     newdata[index].quantity = quantity;
    //                 } else {
    //                     newdata.push(item);
    //                 }
    //             }

    //             setCart(newdata);
    //             setLoading(false);
    //         } catch (err) {
    //             // console.log(err);
    //             setLoading(false);
    //             console.log(err.message);
    //             if (err.message.includes('401')) {
    //                 setLoading(false);
    //                 alert('Cause you not authenticated or your token expired and your safety we logged you out!');
    //                 logout();
    //             }
    //         }
    //     },
    //     [setCart, setLoading, cartItems]
    // );

    // const IncrementItem = (quantity, max, price) => {
    //     if (!max) {
    //         max = 5;
    //     }
    //     if (quantity >= max) {
    //     } else {
    //         // setQuantity(quantity+1)
    //         console.log(quantity + 1);
    //         getQty({ id: props.id, quantity: quantity + 1, price: price });
    //     }
    // };
    // const DecreaseItem = (quantity, min, price) => {
    //     if (!min) {
    //         min = 0;
    //     }
    //     if (quantity <= min || 0) {
    //     } else {
    //         // setQuantity(quantity-1)
    //         console.log(quantity - 1);
    //         getQty({ id: props.id, quantity: quantity - 1, price: price });
    //     }
    // };

    React.useEffect(() => {
        (async () => {
            setLoading(true);
            const d = await asyncLocalStorage.getItem('userData');
            const userData = await JSON.parse(d);
            // console.log(userData);
            if (userData) {
                console.log('ohnnooo');
                try {
                    const result = await axios.post(
                        `${BaseUrl2}/api/users/cart/get`,
                        {
                            uid: userData.uid,
                        },
                        {
                            headers: { Authorization: userData.token },
                        }
                    );
                    // console.log(result);
                    // console.log(result);
                    if (result === undefined || result.data === undefined) {
                        // console.log('error');
                        setLoading(false);
                        alert('Due to some technical problem and your safety we logged you out!');
                        logout();
                    } else {
                        if (userData.user.providerData.length < 2) {
                            console.log(userData.user.providerData.length);
                            setUVP(false);
                        }
                        setLoading(false);
                        setCart(result.data);
                    }
                } catch (e) {
                    console.log(e.message);
                    if (e.message.includes('401')) {
                        setLoading(false);
                        alert('Cause you not authenticated or your token expired and your safety we logged you out!');
                        await logout();
                    }
                }
            } else {
                setLoading(false);
                await logout();
            }
        })();
    }, [setCart, logout, setUVP]);

    return (
        <>
            {loading && <Spinner />}

            <NavDropdown
                activeclassname="active"
                alignRight
                className="dropdown-cart"
                title={
                    <DropDownTitle
                        className="d-inline-block"
                        faIcon="shopping-basket"
                        iconClass="mr-1"
                        title="Cart"
                        badgeClass="ml-1"
                        badgeVariant="success"
                        badgeValue={cartItems && cartItems.length}
                    />
                }
            >
                <div className="dropdown-cart-top shadow-sm">
                    {
                        <CartDropdownHeader
                            className="dropdown-cart-top-header p-4"
                            title="Your Cart"
                            subTitle="Remember!! Belly rules the mind :)"
                            NavLinkUrl="/detail"
                            NavLinkText="View Full Menu"
                        />
                    }
                    <div className="dropdown-cart-top-body border-top p-4">
                        {cartItems.map((item) => {
                            return (
                                <CartDropdownItem
                                    icoIcon="ui-press"
                                    key={item.name}
                                    iconClass={`text-${
                                        item.name.toLowerCase().includes('chicken') ||
                                        item.name.toLowerCase().includes('fish') ||
                                        item.name.toLowerCase().includes('mutton')
                                            ? 'danger'
                                            : 'success'
                                    } food-item`}
                                    title={`${item.name} x ${item.quantity}`}
                                    price={`₹${item.quantity * item.price}`}
                                />
                            );
                        })}
                    </div>
                    <div className="dropdown-cart-top-footer border-top p-4">
                        <p className="mb-0 font-weight-bold text-secondary">
                            Sub Total <span className="float-right text-dark">{total}</span>
                        </p>
                        <small className="text-info">Extra charges may apply</small>
                    </div>
                    <div className="dropdown-cart-top-footer border-top p-2">
                        <NavDropdown.Item
                            eventKey={5.1}
                            as={Link}
                            className="btn btn-success btn-block py-3 text-white text-center dropdown-item"
                            to="/checkout"
                        >
                            {' '}
                            Checkout
                        </NavDropdown.Item>
                    </div>
                </div>
            </NavDropdown>
        </>
    );
}
