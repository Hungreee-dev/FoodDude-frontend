import React, { useState } from 'react';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';
import { Row, Col, Container, Tab } from 'react-bootstrap';

import QuickBite from './common/QuickBite';
import Cart from './Order/Cart';
import Spinner from './Spinner/index';
import { BaseUrl, BaseUrl2 } from '../BaseUrl';
// import { useAuth } from '../contexts/AuthContext';
import { useOrder } from '../contexts/OrderContext';

function Detail(props) {
    // const history = useHistory();
    const [menu, setMenu] = React.useState([]);
    // const { updateCart } = useAuth();
    const { cartItems, setCart } = useOrder();
    const [category, setCategory] = React.useState([]);
    // const [recievedData, setRecievedData] = React.useState(false);
    // const userData = JSON.parse(localStorage.getItem('userData'));
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);

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
            console.log(err);
            setLoading1(false);
        }
    }, []);

    const getQty = React.useCallback(
        async ({ id, quantity, price }) => {
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
                // console.log(newdata);
                // console.log(cartItems);
                // const res = await axios.post(
                //     `${BaseUrl2}/api/users/cart/get`,
                //     {
                //         uid: userData.uid,
                //     },
                //     {
                //         headers: { Authorization: userData.token },
                //     }
                // );
                setCart(newdata);
                setLoading(false);
            } catch (err) {
                // console.log(err);
                setLoading(false);
            }
        },
        [setCart, setLoading, cartItems]
    );

    // const getStarValue = ({ value }) => {
    //     console.log(value);
    //     //console.log(quantity);
    // };

    return (
        <>
            {(loading || loading1) && <Spinner />}

            <Tab.Container defaultActiveKey="first">
                <section className="offer-dedicated-body pt-2 pb-2 food-background">
                    <Container>
                        <Row>
                            <Col md={8}>
                                {/* <h5 className="mb-4">Recommended</h5>
		                              <Form className="explore-outlets-search mb-4">
		                                 <InputGroup>
		                                    <Form.Control type="text" placeholder="Search for dishes..." />
		                                    <InputGroup.Append>
		                                       <Button type="button" variant="link">
		                                       	<Icofont icon="search" />
		                                       </Button>
		                                    </InputGroup.Append>
		                                 </InputGroup>
		                              </Form> */}

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
                                {/* <div className="bg-white rounded shadow-sm text-white mb-4 p-4 clearfix restaurant-detailed-earn-pts card-icon-overlap">
		                     <Image fluid className="float-left mr-3" src="/img/earn-score-icon.png" />
		                     <h6 className="pt-0 text-primary mb-1 font-weight-bold">OFFER</h6>
		                     <p className="mb-0">60% off on orders above $99 | Use coupon <span className="text-danger font-weight-bold">OSAHAN50</span></p>
		                     <div className="icon-overlap">
		                        <Icofont icon="sale-discount" />
		                     </div>
		                </div> */}
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
