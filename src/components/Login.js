import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Row, Col, Container, Form, Button, Alert } from 'react-bootstrap';
import FontAwesome from './common/FontAwesome';
import { auth, googleProvider } from '../firebase';
import axios from 'axios';
import { BaseUrl } from '../BaseUrl';
import './Input/style.css';
import Input from './Input/Index';
import Popup from './staticPages/Popup';
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

function Login(props) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, setCurrentUser, updateCart } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [mobile, setMobile] = useState('');
    const [otp, setotp] = useState('');
    const [disableOTP, setdisableOTP] = useState(false);
    const [time, settime] = useState(60);
    const [popup, setpopup] = useState(false);
    const [loginWithOTP, setloginWithOTP] = useState(true);

    const toggleType = () => {
        setloginWithOTP((prev) => !prev);
    };
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
    const sendOTP = () => {
        setdisableOTP(Date.now());
        setpopup(true);
        setTimeout(() => {
            setpopup(false);
        }, 4100);
    };

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            const result = await login(emailRef.current.value, passwordRef.current.value);
            const token = await result.user.getIdToken();
            // console.log(token)
            const res = await axios.post(
                `${BaseUrl}/api/user/getDetails`,
                {
                    uid: result.user.uid,
                },
                {
                    headers: { Authorization: token },
                }
            );
            const userData = {
                name: res.data.name,
                phone: res.data.phone,
                email: emailRef.current.value,
                uid: result.user.uid,
                token: token,
            };
            await asyncLocalStorage.setItem('userData', JSON.stringify(userData));
            history.push('/');
            updateCart();
        } catch {
            setError('Failed to log in');
        }

        setLoading(false);
    }

    const signInWithGoogle = () => {
        auth.signInWithPopup(googleProvider)
            .then((res) => {
                setCurrentUser(res.user);
                res.user.getIdToken().then((token) => {
                    const userData = {
                        name: res.user.displayName,
                        phone: res.user.phoneNumber,
                        email: res.user.email,
                        uid: res.user.uid,
                        token: token,
                    };
                    asyncLocalStorage.setItem('userData', JSON.stringify(userData));
                });
                updateCart();
                history.push('/');
            })
            .catch((error) => {
                console.log(error.message);
            });
    };
    const signInWithOTP = () => {
        alert('For now this function is invalid!');
    };
    return (
        <>
            <Container fluid className="food-background">
                <Row>
                    <Col md={4} lg={6} className="d-none d-md-flex bg-image hidecol">
                        <img
                            src="https://images.unsplash.com/photo-1502301103665-0b95cc738daf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
                            height="700px"
                            width="800px"
                            alt="home"
                        />
                    </Col>
                    <Col md={8} lg={6}>
                        <div style={{ position: 'relative' }} className="login d-flex align-items-center py-5">
                            {popup && <Popup />}
                            <Container>
                                <Row>
                                    <Col md={9} lg={8} className=" loginbox mx-auto pl-5 pr-5">
                                        <h3 className="login-heading mb-4 watchmax">
                                            <img className="mr-3" src="/img/logo-fd-round.png" alt="logo"></img>
                                            Welcome back!
                                        </h3>
                                        {error && <Alert variant="danger">{error}</Alert>}
                                        {loginWithOTP ? (
                                            <>
                                                <p onClick={toggleType} className="text-center clickAbleText">
                                                    LOGIN WITH EMAIL?
                                                </p>
                                                <div className="row w100 padzero">
                                                    <div className="col padzero pr-2">
                                                        <Input
                                                            style={{ backgroundColor: 'transparent' }}
                                                            filled={mobile !== ''}
                                                            error={isMobileInvalid}
                                                            type="tel"
                                                            Label="Mobile Number"
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
                                                            disabled={isMobileInvalid || disableOTP}
                                                            className="btn pl-1 pr-1 btn-lg btn-google font-weight-normal text-white btn-block text-uppercase"
                                                            onClick={sendOTP}
                                                        >
                                                            SEND OTP {disableOTP && `(Resend in ${time})`}
                                                        </Button>
                                                        <Button
                                                            disabled={isMobileInvalid || otp.length < 4}
                                                            className="btn pl-1 pr-1 btn-lg btn-google font-weight-normal text-white btn-block text-uppercase"
                                                            onClick={signInWithOTP}
                                                        >
                                                            Sign In With OTP
                                                        </Button>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <p onClick={toggleType} className="text-center clickAbleText">
                                                    LOGIN WITH OTP?
                                                </p>
                                                <Form onSubmit={handleSubmit}>
                                                    <div className="form-label-group">
                                                        <Form.Control
                                                            type="email"
                                                            id="inputEmail"
                                                            placeholder="Email address"
                                                            ref={emailRef}
                                                        />
                                                        <Form.Label htmlFor="inputEmail">Email address</Form.Label>
                                                    </div>
                                                    <div className="form-label-group">
                                                        <Form.Control
                                                            type="password"
                                                            id="inputPassword"
                                                            placeholder="Password"
                                                            ref={passwordRef}
                                                        />
                                                        <Form.Label htmlFor="inputPassword">Password</Form.Label>
                                                    </div>

                                                    <Button
                                                        type="submit"
                                                        disabled={loading}
                                                        className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                                                        style={{ marginTop: '30px' }}
                                                    >
                                                        Sign in
                                                    </Button>
                                                    <hr className="my-4" />
                                                    <p className="text-center">LOGIN WITH</p>
                                                    <div className="row w100 padzero">
                                                        <div className="col padzero pr-2">
                                                            <Button
                                                                className="btn pl-1 pr-1 btn-lg btn-google font-weight-normal text-white btn-block text-uppercase"
                                                                onClick={signInWithGoogle}
                                                            >
                                                                <FontAwesome icon="google" className="mr-2" /> Google
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Form>
                                            </>
                                        )}

                                        <div style={{ marginBottom: '20px' }} className="text-center pt-3">
                                            Don’t have an account?{' '}
                                            <Link className="font-weight-bold" to="/register">
                                                Sign Up
                                            </Link>
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

export default Login;
