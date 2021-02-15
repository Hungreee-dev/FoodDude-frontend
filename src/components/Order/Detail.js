import React from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { Row, Col, Container, Tab, Image, Badge } from 'react-bootstrap';
import ItemsCarousel from '../common/ItemsCarousel';
// import GalleryCarousel from './common/GalleryCarousel';
// import CheckoutItem from '../common/CheckoutItem';
import BestSeller from '../common/BestSeller';
import QuickBite from '../common/QuickBite';
import Cart from './Cart';
import Icofont from 'react-icofont';
import { BaseUrl } from '../../BaseUrl';
function Detail(props) {
    const [menu, setMenu] = React.useState([]);
    const [category, setCategory] = React.useState([]);
    const [recievedData, setRecievedData] = React.useState(false);
    React.useEffect(() => {
        try {
            const fetchData = async () => {
                const result = await axios.get(`${BaseUrl}/api/menu/get`);

                if (result.data) {
                    setMenu(result.data);
                    setCategory(
                        result.data.map((item) => {
                            return item.Category;
                        })
                    );
                    setRecievedData(true);
                } else {
                    console.log('error');
                }
            };
            fetchData();
        } catch (err) {
            console.log(err);
        }
    }, []);

    const getQty = ({ id, quantity }) => {
        //console.log(id);
        //console.log(quantity);
    };
    // const getStarValue = ({value}) => {
    // 	console.log(value);
    // 	//console.log(quantity);
    // }

    let MenuData = <></>;
    if (recievedData) {
        const headings = [...new Set(category)];
        console.log(headings);
        MenuData = headings.map((item) => {
            const DishData = [];
            for (let data of menu) {
                if (data.Category === item) {
                    DishData.push(
                        <QuickBite
                            id={1}
                            title={data.Name}
                            showBadge={true}
                            badgeVariant={data.Veg ? 'danger' : 'success'}
                            price={data.Price}
                            priceUnit="₹"
                            getValue={getQty}
                            key={data.Name}
                        />
                    );
                }
            }
            return (
                <Row>
                    <h5 className="mb-4 mt-3 col-md-12">
                        {item} <small className="h6 text-black-50">{DishData.length} ITEMS</small>
                    </h5>
                    <Col md={12}>
                        <div className="bg-white rounded border shadow-sm">
                            {DishData.map((item1) => {
                                console.log('hi');
                                return item1;
                            })}
                        </div>
                    </Col>
                </Row>
            );
        });
    }

    return (
        <>
            <Tab.Container defaultActiveKey="first">
                <section className="offer-dedicated-body pt-2 pb-2 mt-4 mb-4">
                    <Container>
                        <Row>
                            <Col md={8}>
                                <h6 className="mb-3">
                                    Most Popular{' '}
                                    <Badge variant="success">
                                        {' '}
                                        <Icofont icon="tags" /> 15% Off All Items{' '}
                                    </Badge>
                                </h6>
                                <ItemsCarousel />

                                <Row>
                                    <h5 className="mb-4 mt-3 col-md-12">Best Sellers</h5>
                                    <Col md={4} sm={6} className="mb-4">
                                        <BestSeller
                                            id={1}
                                            title="World Famous"
                                            subTitle="North Indian • American • Pure veg"
                                            imageAlt="Product"
                                            image="img/list/1.png"
                                            imageClass="img-fluid item-img"
                                            price={250}
                                            priceUnit="$"
                                            isNew={true}
                                            showPromoted={true}
                                            promotedVariant="dark"
                                            favIcoIconColor="text-danger"
                                            rating="3.1 (300+)"
                                            getValue={getQty}
                                        />
                                    </Col>
                                    <Col md={4} sm={6} className="mb-4">
                                        <BestSeller
                                            id={2}
                                            title="The osahan Restaurant"
                                            subTitle="North Indian • American • Pure veg"
                                            imageAlt="Product"
                                            image="img/list/6.png"
                                            imageClass="img-fluid item-img"
                                            price={250}
                                            priceUnit="$"
                                            qty={1}
                                            showPromoted={true}
                                            promotedVariant="dark"
                                            favIcoIconColor="text-danger"
                                            rating="3.1 (300+)"
                                            getValue={getQty}
                                        />
                                    </Col>

                                    <Col md={4} sm={6} className="mb-4">
                                        <BestSeller
                                            id={3}
                                            title="Bite Me Sandwiches"
                                            subTitle="North Indian • American • Pure veg"
                                            imageAlt="Product"
                                            image="img/list/3.png"
                                            imageClass="img-fluid item-img"
                                            price={250}
                                            priceUnit="$"
                                            showPromoted={true}
                                            promotedVariant="dark"
                                            favIcoIconColor="text-danger"
                                            rating="3.1 (300+)"
                                            getValue={getQty}
                                        />
                                    </Col>
                                </Row>

                                {MenuData}
                            </Col>
                            <Col md={4}>
                                <div className="bg-white rounded shadow-sm text-white mb-4 p-4 clearfix restaurant-detailed-earn-pts card-icon-overlap">
                                    <Image fluid className="float-left mr-3" src="/img/earn-score-icon.png" />
                                    <h6 className="pt-0 text-primary mb-1 font-weight-bold">OFFER</h6>
                                    <p className="mb-0">
                                        60% off on orders above $99 | Use coupon{' '}
                                        <span className="text-danger font-weight-bold">OSAHAN50</span>
                                    </p>
                                    <div className="icon-overlap">
                                        <Icofont icon="sale-discount" />
                                    </div>
                                </div>
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
