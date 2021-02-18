import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Row, Col, Container, Button, Alert } from 'react-bootstrap';

import { auth } from '../../firebase';
import axios from 'axios';
import { BaseUrl2 } from '../../BaseUrl';
import '../Input/style.css';
import Input from '../Input/Index';
import Popup from '../staticPages/Popup';
import firebase from 'firebase';
const asyncLocalStorage = {
    setItem: async function (key, value) {
        return Promise.resolve().then(function () {
            localStorage.setItem(key, value);
        });
    },
    getItem: async function (key) {
        return Promise.resolve().then(function () {
            return localStorage.getItem(key);
        });
    },
};

function LinkPhone(props) {
    const { setCurrentUser, updateCart, setUVP, signinWithPhone } = useAuth();
    const [error, setError] = useState('');
    const history = useHistory();
    const [mobile, setMobile] = useState(props.phone || '');
    const [otp, setotp] = useState('');
    const [disableOTP, setdisableOTP] = useState(false);
    const [time, settime] = useState(60);
    const [popup, setpopup] = useState(false);
    const [working, setWorking] = useState(false);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (userData.user.providerData.length >= 2) {
            alert(`Don't try suspicious Behaviour!'`);
            history.push('/');
        } else if (userData.phone) {
            setMobile(userData.phone);
        }
    }, []);

    if (disableOTP) {
        setTimeout(() => {
            const timePassed = Math.round((Date.now() - disableOTP) / 1000);
            if (timePassed >= 60) {
                setdisableOTP(false);
                settime(60);
                return;
            }
            settime(60 - timePassed);
        }, 1000);
    }

    const isMobileInvalid = (() => {
        const telre = /\+?\d[\d -]{8,12}\d/;
        if (telre.test(String(mobile).toLowerCase()) === false) {
            return true;
        }
        return false;
    })();

    const sendOTP = async () => {
        setdisableOTP(Date.now());
        const verifier = window.recaptchaVerifier;

        try {
            // console.log(res);
            console.log('Send OTP');
            const confirmationResult = await signinWithPhone(`+91${mobile}`, verifier);
            setpopup(true);
            setTimeout(() => {
                setpopup(false);
            }, 4100);
            window.confirmationResult = confirmationResult; // Used by VerificationCodeForm
        } catch (err) {
            alert('LinkupVendor ERROR', err);
            console.log(err);
        }
    };
    const linkingWithPhone = async () => {
        setWorking(true);
        try {
            const credential = firebase.auth.PhoneAuthProvider.credential(
                window.confirmationResult.verificationId,
                otp
            );
            // console.log(credential);
            const res = await auth.currentUser.linkWithCredential(credential);
            const token = await res.user.getIdToken();
            await axios.post(
                `${BaseUrl2}/api/users/update-user`,
                {
                    name: res.user.displayName,
                    phone: res.user.phoneNumber,
                    email: res.user.email,
                    uid: res.user.uid,
                },
                {
                    headers: { Authorization: token },
                }
            );
            const userData = {
                name: res.user.displayName,
                phone: res.user.phoneNumber,
                email: res.user.email,
                uid: res.user.uid,
                token: token,
                user: res.user,
            };
            await asyncLocalStorage.setItem('userData', JSON.stringify(userData));

            updateCart();
            setUVP(true);
            setCurrentUser(res.user);
            console.log('Account linking success');
            alert('Account Linked Successfully!');
            history.push('/');

            setWorking(false);
        } catch (err) {
            setWorking(false);
            alert('confirmationResult.confirm() ERROR');
            alert('Account Linking Failed!');
            console.log('Account linking error', error);
            console.log(err);
        }
    };

    useEffect(() => {
        // Setup recaptcha
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('login-btn', { size: 'invisible' });
            window.recaptchaVerifier.render();
        }
        return () => {
            window.recaptchaVerifier = null;
        };
    }, []);
    return (
        <>
            <Container fluid className="food-background">
                <Row className="rows">
                    <Col md={4} lg={6} className="d-none cols d-md-flex bg-image hidecol">
                        <img
                            src="https://images.unsplash.com/photo-1502301103665-0b95cc738daf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
                            height="700px"
                            width="800px"
                            alt="home"
                        />
                    </Col>
                    <Col md={8} lg={6}>
                        <div
                            style={{ position: 'relative' }}
                            className="login pb-5alt
py-5alt d-flex align-items-center py-5"
                        >
                            {popup && <Popup />}
                            <Container>
                                <Row>
                                    <Col
                                        md={9}
                                        lg={8}
                                        className=" loginbox mx-auto pb-5alt
py-5alt pl-5 pr-5"
                                    >
                                        <h3 className="login-heading mb-4 watchmax">
                                            <img className="mr-3" src="/img/logo-fd-round.png" alt="logo"></img>
                                            Phone Linking!
                                        </h3>
                                        {error && <Alert variant="danger">{error}</Alert>}

                                        <div className="row w100 padzero">
                                            <div className="col padzero pr-2">
                                                <Input
                                                    style={{ backgroundColor: 'transparent' }}
                                                    filled={mobile !== ''}
                                                    error={isMobileInvalid}
                                                    type="tel"
                                                    Label="Mobile Number(10 Digit Format Only)"
                                                    name="Mobile"
                                                    value={mobile}
                                                    change={(e) => {
                                                        setMobile(e.target.value);
                                                    }}
                                                />
                                                <Input
                                                    style={{ backgroundColor: 'transparent' }}
                                                    filled={mobile !== ''}
                                                    error={otp.length < 4}
                                                    type="number"
                                                    Label="OTP"
                                                    name="otp"
                                                    value={otp}
                                                    change={(e) => {
                                                        if (e.target.value.length <= 8) setotp(e.target.value);
                                                    }}
                                                />
                                                <Button
                                                    id="login-btn"
                                                    disabled={
                                                        isMobileInvalid || disableOTP || !window.recaptchaVerifier
                                                    }
                                                    className="btn pl-1 pr-1 btn-lg btn-google font-weight-normal text-white btn-block text-uppercase"
                                                    onClick={sendOTP}
                                                >
                                                    SEND OTP {disableOTP && `(Resend in ${time})`}
                                                </Button>
                                                <Button
                                                    disabled={isMobileInvalid || otp.length < 4 || working}
                                                    className="btn pl-1 pr-1 btn-lg btn-google font-weight-normal text-white btn-block text-uppercase"
                                                    onClick={linkingWithPhone}
                                                >
                                                    Link Phone
                                                </Button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default LinkPhone;
