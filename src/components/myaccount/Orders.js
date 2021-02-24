import React, { useState } from 'react';
import axios from 'axios';
import OrderCard from '../common/OrderCard';
// import {Row,Col} from 'react-bootstrap';
import { BaseUrl } from '../../BaseUrl';
import Spinner from '../Spinner/index';
const { uid, token } = JSON.parse(localStorage.getItem('userData'));

function Orders() {
    const [orderData, setOrderData] = useState([]);
    const [dataRecieved, setdataRecieved] = useState(false);
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        try {
            setLoading(true);
            const fetchData = async () => {
                const result = await axios
                    .post(
                        `${BaseUrl}/api/order/user`,
                        {
                            userId: uid,
                        },
                        { headers: { Authorization: token } }
                    )
                    .catch((err) => {
                        console.log(err.response);
                    });

                if (result.data) {
                    setOrderData(result.data);
                    setdataRecieved(true);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            };
            fetchData();
        } catch (err) {
            setLoading(false);
        }
    }, [dataRecieved]);

    if (orderData !== null || orderData !== undefined || dataRecieved === true) {
        return (
            <>
                {loading && <Spinner />}
                {orderData.map((item) => {
                    const orderItem = item.items;

                    var id = item.id;
                    var orderDate = { new: Date(item.billing.orderTime) };
                    var Time = orderDate.new.substring(0, 24);
                    var address = item.Address;
                    var amount = item.billing.finalAmount;
                    var location = '';
                    if (item.Address) {
                        location =
                            address.houseNumber +
                            ' ' +
                            address.line1 +
                            ' ' +
                            address.line2 +
                            ' ' +
                            address.city +
                            ' ' +
                            address.state;
                    }
                    var Status = item.orderStatus;
                    console.log(Status);
                    var orderproducts = '';
                    for (var i = 0; i < orderItem.length; i++) {
                        orderproducts += orderItem[i].name + 'x' + orderItem[i].quantity + ',';
                    }

                    return (
                        <OrderCard
                            image="/img/3.jpg"
                            imageAlt=""
                            orderNumber={id}
                            orderDate={Time}
                            deliveredDate={Status}
                            orderTitle="Gus's World Famous Fried Chicken"
                            address={location}
                            orderProducts={orderproducts}
                            orderTotal={amount}
                            helpLink="#"
                            detailLink="/detail"
                        />
                    );
                })}
            </>
        );
    } else {
        return <></>;
    }
}
export default Orders;
