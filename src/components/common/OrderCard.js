import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image, Media } from 'react-bootstrap';
import Icofont from 'react-icofont';

function OrderCard(props) {
    const [deliveryStatus, setDeliveryStatus] = useState('');
    React.useEffect(() => {
        console.log(props.deliveredDate);
        console.log(typeof props.deliveredDate);
        if (props.deliveredDate === 0) setDeliveryStatus('Processing');
        else if (props.deliveredDate === 1) setDeliveryStatus('On the Way');
        else if (props.deliveredDate === 2) setDeliveryStatus('Delivered');
    }, []);
    return (
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
                            <Link className="btn btn-sm btn-primary" to={'/detail'}>
                                <Icofont icon="refresh" /> REORDER
                            </Link>
                        </div>
                        <p className="mb-0 text-black text-primary pt-2">
                            <span className="text-black font-weight-bold"> Total Paid:</span> {props.orderTotal}
                        </p>
                    </Media.Body>
                </Media>
            </div>
        </div>
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
    orderTotal: PropTypes.string.isRequired,
};
export default OrderCard;
