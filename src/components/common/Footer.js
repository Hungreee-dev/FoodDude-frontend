import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import './footerStyle.css';

function Footer(props) {
    return (
        <>
            <section className="footer pt-5 pb-3">
                <div className="Container">
                    <div className="rows">
                        <div className="cols" md={3} sm={6}>
                            <div className="app">
                                <p className="mb-2 user_select_disable">DOWNLOAD OUR APP</p>
                                <Link to="#">
                                    <Image src="img/google.png" alt="" fluid />
                                </Link>
                            </div>
                        </div>
                        <div className="cols" md={2} sm={6} xs={6}>
                            <h6 className="mb-3 user_select_disable">Support</h6>
                            <ul>
                                <li>
                                    <Link to="/about">About Us</Link>
                                </li>
                                <li>
                                    <Link to="/contact">Contact us</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="cols" md={3} sm={6} xs={6}>
                            <h6 className="mb-3 user_select_disable">Legal</h6>
                            <ul>
                                <li>
                                    <Link to="/privacy">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link to="/terms">Terms of Service</Link>
                                </li>
                                <li>
                                    <Link to="/refund">Refund/ Cancellation Policy</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

Footer.propTypes = {
    sectionclassName: PropTypes.string,
    popularCHclassName: PropTypes.string,
    popularCountries: PropTypes.array,
    popularFHclassName: PropTypes.string,
    popularFood: PropTypes.array,
    copyrightText: PropTypes.string,
    madewithIconclassName: PropTypes.string,
    firstLinkText: PropTypes.string,
    firstLink: PropTypes.string,
    secondLinkText: PropTypes.string,
    secondLink: PropTypes.string,
};

Footer.defaultProps = {
    sectionclassName: 'footer-bottom-search pt-5 pb-5 bg-white',
    popularCHclassName: 'text-black',
    popularCountries: [],
    popularFHclassName: 'mt-4 text-black',
    popularFood: [],
    copyrightText: '© Copyright 2020 Osahan Eat. All Rights Reserved',
    madewithIconclassName: 'heart heart-icon text-danger',
    firstLinkText: 'Gurdeep Osahan',
    firstLink: '//www.instagram.com/iamgurdeeposahan/',
    secondLinkText: 'Askbootstrap',
    secondLink: '//askbootstrap.com/',
};

export default Footer;
