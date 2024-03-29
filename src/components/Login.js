import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Row, Col, Container, Form, Button, Alert } from 'react-bootstrap';
import FontAwesome from './common/FontAwesome';
import { auth, googleProvider } from '../firebase';
import axios from 'axios';
import { BaseUrl2, BaseUrl } from '../BaseUrl';
import './Input/style.css';
import Input from './Input/Index';
import Popup from './staticPages/Popup';
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

function Login(props) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, currentUser, setCurrentUser, updateCart, signinWithPhone, setUserData } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [mobile, setMobile] = useState('');
    const [otp, setotp] = useState('');
    const [disableOTP, setdisableOTP] = useState(false);
    const [time, settime] = useState(60);
    const [popup, setpopup] = useState(false);
    const [loginWithOTP, setloginWithOTP] = useState(true);
    const [working, setWorking] = useState(false);

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
                user: result.user,
            };
            await asyncLocalStorage.setItem('userData', JSON.stringify(userData));
            setUserData(userData);
            setCurrentUser(result.user);
            history.push('/');
            updateCart();
        } catch {
            setError('Failed to log in');
        }

        setLoading(false);
    }

    const signInWithGoogle = async () => {
        try {
            const res = await auth.signInWithPopup(googleProvider);
            if (res.additionalUserInfo.isNewUser) {
                await auth.currentUser.delete().then(() => {
                    console.log('User Deleted');
                });
                alert('Create a account first');
                history.push('/register');
                return;
            }
            const token = await res.user.getIdToken();
            const userData = {
                name: res.user.displayName,
                phone: res.user.phoneNumber,
                email: res.user.email,
                uid: res.user.uid,
                token: token,
                user: res.user,
            };
            await asyncLocalStorage.setItem('userData', JSON.stringify(userData));
            setUserData(userData);
            setCurrentUser(res.user);
            history.push('/');
        } catch (e) {
            console.log(error.message);
        }
    };
    const sendOTP = async () => {
        setdisableOTP(Date.now());
        const verifier = window.recaptchaVerifier;

        try {
            await axios.post(`https://fooddude-node.herokuapp.com/api/users/check-user-by-phoneNumber`, {
                token: 'FoodDude',
                phone: `+91${mobile}`,
            });

            // console.log(res);
            console.log('Send OTP');
            const confirmationResult = await signinWithPhone(`+91${mobile}`, verifier);
            setpopup(true);
            setTimeout(() => {
                setpopup(false);
            }, 4100);
            window.confirmationResult = confirmationResult; // Used by VerificationCodeForm
        } catch (err) {
            if (err.message.includes('404')) {
                alert('Please create account first!');
                history.push('/register');
            } else {
                alert('OTP Limit reached or network error!', err);
                console.log(err.body);
            }
        }
    };
    const loginWithPhone = async () => {
        setWorking(true);
        try {
            const res = await window.confirmationResult.confirm(otp);
            const token = await res.user.getIdToken();
            const userData = {
                name: res.user.displayName,
                phone: res.user.phoneNumber,
                email: res.user.email,
                uid: res.user.uid,
                token: token,
                user: res.user,
            };
            console.log(userData);
            await asyncLocalStorage.setItem('userData', JSON.stringify(userData));
            console.log('Done');
            setUserData(userData);
            setCurrentUser(res.user);
            setWorking(false);
            history.push('/');
        } catch (err) {
            setWorking(false);
            alert('confirmationResult.confirm() ERROR', err);
        }
    };

    useEffect(() => {
        // Setup recaptcha
        if (loginWithOTP && !window.recaptchaVerifier) {
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('login-btn', { size: 'invisible' });
            window.recaptchaVerifier.render();
        }
        return () => {
            window.recaptchaVerifier = null;
        };
    }, [loginWithOTP]);
    return (
        <>
            {currentUser && <Redirect to="/" />}
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
                                <Row className="rows">
                                    <Col
                                        md={9}
                                        lg={8}
                                        className=" loginbox mx-auto pb-5alt cols
py-5alt pl-5 pr-5"
                                    >
                                        <h3 className="login-heading mb-4 watchmax">
                                            <img className="mr-3" src="/img/logo-fd-round.png" alt="logo"></img>
                                            Welcome back!
                                        </h3>
                                        {error && <Alert variant="danger">{error}</Alert>}
                                        {loginWithOTP ? (
                                            <>
                                                <p onClick={toggleType} className="text-center clickAbleText">
                                                    LOGIN WITH EMAIL ?
                                                </p>
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
                                                                isMobileInvalid ||
                                                                disableOTP ||
                                                                !window.recaptchaVerifier
                                                            }
                                                            className="btn pl-1 pr-1 btn-lg btn-google font-weight-normal text-white btn-block text-uppercase"
                                                            onClick={sendOTP}
                                                        >
                                                            SEND OTP {disableOTP && `(Resend in ${time})`}
                                                        </Button>
                                                        <Button
                                                            disabled={isMobileInvalid || otp.length < 4 || working}
                                                            className="btn pl-1 pr-1 btn-lg btn-google font-weight-normal text-white btn-block text-uppercase"
                                                            onClick={loginWithPhone}
                                                        >
                                                            Sign In With OTP
                                                        </Button>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <p onClick={toggleType} className="text-center clickAbleText">
                                                    LOGIN WITH OTP ?
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
                                                        disabled={loading || working}
                                                        className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                                                        style={{ marginTop: '30px' }}
                                                    >
                                                        Sign in
                                                    </Button>
                                                </Form>
                                            </>
                                        )}
                                        <hr className="my-4" />
                                        <p className="text-center">LOGIN WITH</p>
                                        <div className="row w100 padzero">
                                            <div className="col padzero pr-2">
                                                <Button
                                                    disabled={working}
                                                    className="btn pl-1 pr-1 btn-lg btn-google font-weight-normal text-white btn-block text-uppercase"
                                                    onClick={signInWithGoogle}
                                                >
                                                    <FontAwesome icon="google" className="mr-2" /> Google
                                                </Button>
                                            </div>
                                        </div>
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
