import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel3';
import TopSearch from './home/TopSearch';
// import ProductBox from './home/ProductBox';
// import Header from './common/Header';
// import CardItem from './common/CardItem';
import SectionHeading from './common/SectionHeading';
import FontAwesome from './common/FontAwesome';
import Image from '../assets/test.jpg';
import ReviewCard from './ReviewCard/index';

function Index(props) {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        setReviews([
            {
                photoURL: Image,
                review:
                    'Fooddude provides you the best food ranging from several cuisines from the best kitchens throughout the city.Fooddude provides you the best food ranging from several cuisines from the best kitchens throughout the city.',
                username: 'Robert Smith',
                rating: 4.3,
            },
            {
                photoURL: Image,
                review:
                    'Fooddude provides you the best food ranging from several cuisines from the best kitchens throughout the city.Fooddude provides you the best food ranging from several cuisines from the best kitchens throughout the city.',
                username: 'Robert Smith',
                rating: 4.3,
            },
            {
                photoURL: Image,
                review:
                    'Fooddude provides you the best food ranging from several cuisines from the best kitchens throughout the city.Fooddude provides you the best food ranging from several cuisines from the best kitchens throughout the city.',
                username: 'Robert Smith',
                rating: 4.3,
            },
            {
                photoURL: Image,
                review:
                    'Fooddude provides you the best food ranging from several cuisines from the best kitchens throughout the city.Fooddude provides you the best food ranging from several cuisines from the best kitchens throughout the city.',
                username: 'Robert Smith',
                rating: 4.3,
            },
            {
                photoURL: Image,
                review:
                    'Fooddude provides you the best food ranging from several cuisines from the best kitchens throughout the city.Fooddude provides you the best food ranging from several cuisines from the best kitchens throughout the city.',
                username: 'Robert Smith',
                rating: 4.3,
            },
            {
                photoURL: Image,
                review:
                    'Fooddude provides you the best food ranging from several cuisines from the best kitchens throughout the city.Fooddude provides you the best food ranging from several cuisines from the best kitchens throughout the city.',
                username: 'Robert Smith',
                rating: 4.3,
            },
        ]);
    }, []);

    return (
        <>
            <TopSearch />
            <div className="food-background">
                <section className="section pt-5 pb-5 homepage-add-section ">
                    <SectionHeading heading="Our Motto" subHeading="" />
                    <div className="container">
                        <div className="row row_motto">
                            <div className="col col_motto">
                                <blockquote
                                    class="blockquote blockquote-custom  p-5 shadow rounded card_moto"
                                    style={{
                                        height: '280px',
                                        background: '#f0f0f0',
                                    }}
                                >
                                    <div class="blockquote-custom-icon bg-info shadow-sm">
                                        <i class="fa fa-quote-left text-white"></i>
                                    </div>
                                    <h4 className="mb-2 font-weight-normal">
                                        <span className="font-weight-bold">Affordability</span>
                                    </h4>
                                    <p class="mb-0 mt-2 font-italic">
                                        "The tastiest food doesn't have to be the costliest. In these tough times, it
                                        may be very hard for us to spend every time we crave something delicious.
                                        Fooddude promises to be the most affordable option you have to satisfy your
                                        hunger."
                                    </p>
                                </blockquote>
                            </div>
                            <div className="col col_motto">
                                <blockquote
                                    class="blockquote blockquote-custom  p-5 shadow rounded card_moto"
                                    style={{
                                        height: '280px',
                                        background: '#f0f0f0',
                                    }}
                                >
                                    <div class="blockquote-custom-icon bg-info shadow-sm">
                                        <i class="fa fa-quote-left text-white"></i>
                                    </div>
                                    <h4 className="mb-2 font-weight-normal">
                                        <span className="font-weight-bold">Quality</span>
                                    </h4>
                                    <p class="mb-0 mt-2 font-italic">
                                        "Fooddude provides you the best food ranging from several cuisines from the best
                                        kitchens throughout the city. We assure you of satisfying your palette minus the
                                        food colours and unnecessary oil."
                                    </p>
                                </blockquote>
                            </div>
                            <div className="col col_motto">
                                <blockquote
                                    class="blockquote blockquote-custom  p-5 shadow rounded card_moto"
                                    style={{
                                        height: '280px',
                                        background: '#f0f0f0',
                                    }}
                                >
                                    <div class="blockquote-custom-icon bg-info shadow-sm">
                                        <i class="fa fa-quote-left text-white"></i>
                                    </div>
                                    <h4 className="mb-2 font-weight-normal">
                                        <span className="font-weight-bold">Hygiene</span>
                                    </h4>
                                    <p class="mb-0 mt-2 font-italic">
                                        "The pandemic has forced us to rethink our sanitary practices. But, Fooddude
                                        promises that you'll never have to think twice while ordering from us. Our
                                        delivery agents are checked and sanitized regularly and use masks and gloves
                                        throughout the process to ensure your food reaches to you safely."
                                    </p>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section pt-5 pb-5 products-section">
                    <Container>
                        <SectionHeading
                            heading="Our Happy Customers!"
                            subHeading="All of the smiles in our heart...."
                        />
                        <Row>
                            <Col md={12}>
                                <OwlCarousel nav {...options} className="owl-carousel-four owl-theme">
                                    {reviews.map((ele, i) => (
                                        <ReviewCard {...ele} key={i} />
                                    ))}
                                </OwlCarousel>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section
                    className="section pt-5 pb-5  becomemember-section border-bottom "
                    style={{ marginTop: '-70px' }}
                >
                    <Container>
                        <SectionHeading heading="Join The Family" subHeading="" />
                        <Row>
                            <Col sm={12} className="text-center">
                                <Link to="/detail" className="btn btn-success btn-lg">
                                    Check Menu <FontAwesome icon="chevron-circle-right" />
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        </>
    );
}

const options = {
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 2,
        },
        1000: {
            items: 3,
        },
        1200: {
            items: 3,
        },
    },

    lazyLoad: true,
    pagination: false.toString(),
    loop: false,
    rewind: true,
    dots: false,
    autoplay: true,
    autoPlay: 1000,
    nav: true,
    autoplayHoverPause: true,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
};

export default Index;
