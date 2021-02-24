import React, { useState } from 'react';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';
import { Row, Col, Container, Tab } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import QuickBite from './common/QuickBite';
import Cart from './Order/Cart';
import Spinner from './Spinner/index';
import { BaseUrl, BaseUrl2 } from '../BaseUrl';
import { useAuth } from '../contexts/AuthContext';
import { useOrder } from '../contexts/OrderContext';

function Detail(props) {
    const history = useHistory();
    const [menu, setMenu] = React.useState([]);
    const { cartItems, setCart } = useOrder();
    const [category, setCategory] = React.useState([]);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const { logout, currentUser } = useAuth();

    React.useEffect(() => {
        try {
            setLoading1(true);
            const fetchData = async () => {
                const result = await axios.get(`${BaseUrl}/api/menu/get`);
                if (result.data) {
                    setMenu(result.data);
                    setCategory(
                        result.data.map((item) => {
                            return item.Category;
                        })
                    );
                    // setRecievedData(true);
                    setLoading1(false);
                } else {
                    console.log('error');
                    setLoading1(false);
                }
            };
            fetchData();
        } catch (err) {
            setLoading1(false);
            console.log(err.message);
            if (err.message.includes('401')) {
                setLoading(false);
                alert('Cause you not authenticated or your token expired and your safety we logged you out!');
                logout();
            }
        }
    }, []);

    const getQty = React.useCallback(
        async ({ id, quantity, price }) => {
            if (!currentUser) {
                history.push('/login');
                return;
            } else {
                try {
                    const userData = JSON.parse(localStorage.getItem('userData'));
                    const item = {
                        name: id,
                        quantity: quantity,
                        price: price,
                    };
                    // console.log(item);
                    setLoading(true);
                    await axios.post(
                        `${BaseUrl2}/api/users/cart/add`,
                        {
                            item: item,
                            uid: userData.uid,
                        },
                        {
                            headers: {
                                Authorization: userData.token,
                            },
                        }
                    );
                    let newdata = [...cartItems];
                    // console.log(newdata);
                    if (quantity === 0) {
                        newdata = newdata.filter((ele) => ele.name !== id);
                    } else {
                        const index = newdata.findIndex((ele) => ele.name === id);
                        if (index !== -1) {
                            newdata[index].quantity = quantity;
                        } else {
                            newdata.push(item);
                        }
                    }
                    setCart(newdata);
                    setLoading(false);
                } catch (err) {
                    setLoading(false);
                    console.log(err.message);
                    if (err.message.includes('401')) {
                        setLoading(false);
                        alert('Cause you not authenticated or your token expired and your safety we logged you out!');
                        logout();
                    }
                }
            }
        },
        [setCart, setLoading, cartItems]
    );

    return (
        <>
            {(loading || loading1) && <Spinner />}

            <Tab.Container defaultActiveKey="first">
                <section className="offer-dedicated-body pt-2 pb-2 food-background">
                    <Container>
                        <Row>
                            <Col md={8}>
                                {category &&
                                    [...new Set(category)].map((item) => {
                                        const DishData = [];
                                        for (let data of menu) {
                                            if (data.Category === item) {
                                                DishData.push(
                                                    <QuickBite
                                                        id={data.Name}
                                                        title={data.Name}
                                                        showBadge={true}
                                                        badgeVariant={data.Veg ? 'danger' : 'success'}
                                                        price={parseInt(data.Price)}
                                                        priceUnit="₹"
                                                        getValue={getQty}
                                                        key={data.Name}
                                                    />
                                                );
                                            }
                                        }
                                        return (
                                            <Row key={item}>
                                                <h3 className="mb-4 mt-3 col-md-12">
                                                    {item}{' '}
                                                    <small className="h6 text-black-50">{DishData.length} ITEMS</small>
                                                </h3>
                                                <Col md={12}>
                                                    <div className="bg-white rounded border shadow-sm">{DishData}</div>
                                                </Col>
                                            </Row>
                                        );
                                    })}
                            </Col>
                            <Col md={4}>
                                <Cart />
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Tab.Container>
        </>
    );
}

export default Detail;
