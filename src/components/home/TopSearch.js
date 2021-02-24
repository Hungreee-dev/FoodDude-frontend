import React from 'react';
import axios from 'axios';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import OwlCarousel from 'react-owl-carousel3';
import ProductBox from './ProductBox';
import { auth, phoneProvider } from '../../firebase';
import { BaseUrl } from '../../BaseUrl';

function TopSearch(props) {
    const pincodeRef = React.useRef();
    const [pincode, setPincode] = React.useState('');
    const [sendingData, setSendingData] = React.useState(false);
    const [resData, setResData] = React.useState(null);

    React.useEffect(() => {
        if (sendingData) {
            const fetchData = async () => {
                try {
                    const result = await axios.post(`${BaseUrl}/api/pincode/check`, {
                        Pincode: pincode,
                    });
                    if (result.data) {
                        setResData(result.data);
                        setSendingData(false);
                    } else {
                        setResData('error');
                        setSendingData(false);
                    }
                } catch (err) {
                    setResData('error');
                    setSendingData(false);
                }
            };
            fetchData();
        }
    }, [pincode]);

    function handleSubmit() {
        setPincode(pincodeRef.current.value);
        setSendingData(true);
    }

    return (
        <section
            className="pt-5 pb-5 homepage-search-block position-relative generator-bg"
            style={{
                backgroundImage:
                    'linear-gradient( to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 1)),linear-gradient( to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 1)),url(https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
            }}
        >
            <Container>
                <Row className="d-flex align-items-center">
                    <Col md={8}>
                        <div className="homepage-search-title">
                            <h1 className="mb-2 font-weight-normal" style={{ color: 'whitesmoke' }}>
                                <span className="font-weight-bold">Find Awesome Food</span>
                                <i> in Bhubaneshwar</i>
                            </h1>
                            <h5 className="mb-5  font-weight-normal" style={{ color: 'white', marginTop: '20px' }}>
                                Get the top mouthwatering dishes, based on trends
                            </h5>
                        </div>
                        <div className="homepage-search-form">
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSubmit();
                                }}
                                className="form-noborder"
                            >
                                <div className="form-row">
                                    <Form.Group className="col-lg-7 col-md-7 col-sm-12">
                                        <Form.Control
                                            type="number"
                                            as="input"
                                            placeholder="Pincode "
                                            size="lg"
                                            ref={pincodeRef}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-lg-2 col-md-2 col-sm-12">
                                        <Button
                                            disabled={sendingData}
                                            onClick={handleSubmit}
                                            className="btn btn-primary btn-block btn-lg "
                                        >
                                            Check
                                        </Button>
                                    </Form.Group>
                                </div>
                            </Form>
                            {!resData ? (
                                <h7 className="mt-4 text-shadow font-weight-normal" style={{ color: 'whitesmoke' }}>
                                    Enter your pincode to check if we deliver there
                                </h7>
                            ) : resData.success ? (
                                <h7 className="mt-4 text-shadow font-weight-normal" style={{ color: 'whitesmoke' }}>
                                    Yoooohoooo!! We deliver here. Start Ordering Dude!
                                </h7>
                            ) : (
                                <h7 className="mt-4 text-shadow font-weight-normal" style={{ color: 'whitesmoke' }}>
                                    Ahhh Damn!! We will reach out there soon. Not delivering there as of now!
                                </h7>
                            )}
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="osahan-slider pl-4 pt-3">
                            <OwlCarousel nav loop {...options2} className="homepage-ad owl-theme">
                                <div className="item">
                                    <ProductBox
                                        image="/img/slider.png"
                                        imageClass="img-fluid rounded"
                                        imageAlt="carousel"
                                        linkUrl="detail"
                                    />
                                </div>
                                <div className="item">
                                    <ProductBox
                                        image="/img/slider1.png"
                                        imageClass="img-fluid rounded"
                                        imageAlt="carousel"
                                        linkUrl="detail"
                                    />
                                </div>
                                <div className="item">
                                    <ProductBox
                                        image="/img/slider2.png"
                                        imageClass="img-fluid rounded"
                                        imageAlt="carousel"
                                        linkUrl="detail"
                                    />
                                </div>
                                <div className="item">
                                    <ProductBox
                                        image="/img/slider3.png"
                                        imageClass="img-fluid rounded"
                                        imageAlt="carousel"
                                        linkUrl="detail"
                                    />
                                </div>
                            </OwlCarousel>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

const options2 = {
    responsive: {
        0: {
            items: 2,
        },
        764: {
            items: 2,
        },
        765: {
            items: 1,
        },
        1200: {
            items: 1,
        },
    },
    lazyLoad: true,
    loop: true,
    autoplay: true,
    autoplaySpeed: 1000,
    dots: false,
    autoplayTimeout: 2000,
    nav: true,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    autoplayHoverPause: true,
};

export default TopSearch;
