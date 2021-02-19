import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import SectionHeading from '../common/SectionHeading';
function AboutUs(props) {
    return (
        <>
            <section className="section pt-5 pb-5 bg-white homepage-add-section food-background">
                <Container>
                    <Row>
                        <Col md={12} xs={12}>
                            <blockquote
                                class="blockquote blockquote-custom  p-5 shadow rounded"
                                style={{ background: 'white' }}
                            >
                                <SectionHeading heading="Refund/Cancellation Policy" subHeading="" />
                                <div class="mb-0 mt-2 " style={{ fontSize: '16px', color: 'black' }}>
                                    <ul>
                                        <li>
                                            You acknowledge that your cancellation( attempted or purported) of an Order
                                            shall amount to a breach of your unconditional and irrevocable authorization
                                            in favour of Fooddude to place that Order against the Restaurant /Store(s)
                                            on your behalf (“Authorization Breach"). In the event you commit an
                                            Authorization Breach, you shall be liable to pay the liquidated damages of
                                            an amount equivalent to the Order Value. You hereby authorize Fooddude to
                                            deduct or collect the amount payable as liquidated damages through such
                                            means as Fooddude may determine in its discretion, including without
                                            limitation, by deducting such amount from any payment made towards your next
                                            Order
                                        </li>
                                        <li>
                                            In the event, if You have provided incorrect particulars, e.g., contact
                                            number, delivery address, etc., or You were unresponsive, not reachable, or
                                            unavailable for the fulfillment of the services offered to You, You will not
                                            be eligible for any refunds.
                                        </li>
                                        <li>
                                            {' '}
                                            No replacement/refund / or any other resolution will be provided without
                                            Restaurant’s/Store(s)’ permission.
                                        </li>
                                        <li>
                                            {' '}
                                            For any complaint, concerning the Order which shall include instances but
                                            not be limited to food spillage, foreign object in food, delivery of the
                                            wrong order or food and beverages or Products, poor quality, You will be
                                            required to share the proof of the same before any refund can be provided.
                                        </li>
                                        <li>
                                            {' '}
                                            You shall not be entitled to a refund in case instructions placed along with
                                            the Order are not followed in the form and manner You had intended.
                                            Instructions are followed by the Restaurant /Store on a best-efforts basis.
                                        </li>
                                        <li>
                                            {' '}
                                            All refunds shall be processed in the same manner as they are received,
                                            unless refunds have been provided to You in the form of credits, the refund
                                            amount will reflect in your account based on respective banks policies.
                                        </li>
                                    </ul>
                                </div>
                            </blockquote>
                        </Col>
                        {/* <Col md={4} xs={6}>
								<blockquote class="blockquote blockquote-custom  p-5 shadow rounded" style={{height:'300px',background:'#f0f0f0'}}>
									<div class="blockquote-custom-icon bg-info shadow-sm"><i class="fa fa-quote-left text-white"></i></div>
									<h4 className="mb-2 font-weight-normal"><span className="font-weight-bold">Quality</span></h4>
									<p class="mb-0 mt-2 font-italic">"Fooddude provides you the best food ranging from several
							cuisines from the best kitchens throughout the city. We assure you of satisfying your palette minus
							the food colours and unnecessary oil."</p>

								</blockquote>
							</Col>
							<Col md={4} xs={6}>
								<blockquote class="blockquote blockquote-custom  p-5 shadow rounded" style={{background:'#f0f0f0'}}>
									<div class="blockquote-custom-icon bg-info shadow-sm"><i class="fa fa-quote-left text-white"></i></div>
									<h4 className="mb-2 font-weight-normal"><span className="font-weight-bold">Hygiene</span></h4>
									<p class="mb-0 mt-2 font-italic">"The pandemic has forced us to rethink our
							sanitary practices. But, Fooddude promises that you'll never have to think twice while ordering from us.
							Our delivery agents are checked and sanitized regularly
							 and use masks and gloves throughout the process to ensure your food reaches to you safely."</p>

								</blockquote>
							</Col> */}
                    </Row>
                </Container>
            </section>
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
            items: 4,
        },
        1200: {
            items: 4,
        },
    },

    lazyLoad: true,
    pagination: false.toString(),
    loop: true,
    dots: false,
    autoPlay: 2000,
    nav: true,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
};

export default AboutUs;
