import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { Image, Media, Button } from 'react-bootstrap';
import Spinner from '../Spinner/index';
import Icofont from 'react-icofont';
import axios from 'axios';
import { BaseUrl, BaseUrl2 } from '../../BaseUrl';
import { useOrder } from '../../contexts/OrderContext';
const { uid, token } = JSON.parse(localStorage.getItem('userData'));

function OrderCard(props) {
    const history = useHistory();
    const [deliveryStatus, setDeliveryStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const { setCart } = useOrder();
    React.useEffect(() => {
        if (props.deliveredDate === 0) setDeliveryStatus('Processing');
        else if (props.deliveredDate === 1) setDeliveryStatus('On the Way');
        else if (props.deliveredDate === 2) setDeliveryStatus('Delivered');
    }, []);

    const reOrder = async () => {
        setLoading(true);
        await axios
            .post(
                `${BaseUrl}/api/order/get`,
                {
                    id: props.orderNumber,
                },
                {
                    headers: { Authorization: token },
                }
            )
            .then(async (res) => {
                if (res.success !== false) {
                    await axios
                        .post(
                            `${BaseUrl2}/api/users/cart/delete`,
                            {
                                uid: uid,
                            },
                            {
                                headers: { Authorization: token },
                            }
                        )
                        .then((res) => {
                            console.log('cart data has been deleted');
                        })
                        .catch((err) => {
                            console.log(err.response);
                            setLoading(false);
                        });

                    const allItems = res.data.items.map((it) => {
                        return axios
                            .post(
                                `${BaseUrl2}/api/users/cart/add`,
                                {
                                    uid: uid,
                                    item: it,
                                },
                                { headers: { Authorization: token } }
                            )
                            .catch((err) => {
                                console.log(err);
                                setLoading(false);
                                alert('Something Fishy Happend Please reload!');
                            });
                    });
                    await Promise.all(allItems);
                    setCart(res.data.items);
                    console.log('item has been inserted into cart');
                    setLoading(false);
                    history.push('../checkout');
                } else {
                    console.log(res.message);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            {loading && <Spinner />}
            <div className="bg-white card mb-4 order-list shadow-sm">
                <div className="gold-members p-4">
                    <Media>
                        <Image className="mr-4" src={props.image} alt={props.imageAlt} />
                        <Media.Body>
                            <span className="float-right text-info">
                                {deliveryStatus}
                                {deliveryStatus == 'Delivered' ? (
                                    <Icofont icon="check-circled" className="text-success ml-1" />
                                ) : null}
                            </span>

                            <h6 className="mb-2">
                                <Link to={props.detailLink} className="text-black">
                                    {props.orderTitle}{' '}
                                </Link>
                            </h6>
                            <p className="text-gray mb-1">
                                <Icofont icon="location-arrow" /> {props.address}
                            </p>
                            <p className="text-gray mb-3">
                                <Icofont icon="list" /> ORDER #{props.orderNumber}
                                <Icofont icon="clock-time" className="ml-2" /> {props.orderDate}
                            </p>
                            <p className="text-dark">{props.orderProducts}</p>
                            <hr />
                            <div className="float-right">
                                <Button className="btn btn-sm btn-primary" onClick={reOrder}>
                                    <Icofont icon="refresh" /> REORDER
                                </Button>
                            </div>
                            <p className="mb-0 text-black text-primary pt-2">
                                <span className="text-black font-weight-bold"> Total Paid:</span> {props.orderTotal}
                            </p>
                        </Media.Body>
                    </Media>
                </div>
            </div>
        </>
    );
}

OrderCard.propTypes = {
    image: PropTypes.string.isRequired,
    imageAlt: PropTypes.string,
    orderNumber: PropTypes.string.isRequired,
    orderDate: PropTypes.string.isRequired,
    deliveredDate: PropTypes.string,
    orderTitle: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    orderProducts: PropTypes.string.isRequired,
    helpLink: PropTypes.string.isRequired,
    detailLink: PropTypes.string.isRequired,
    orderTotal: PropTypes.number.isRequired,
};
export default OrderCard;
