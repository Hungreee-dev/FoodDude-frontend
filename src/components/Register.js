import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Row, Col, Container, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import FontAwesome from './common/FontAwesome';
import { auth, googleProvider } from '../firebase';
import axios from 'axios';
import Input from './Input/Index';

function Register(props) {
    const [name, setname] = useState('');
    const [phone, setphone] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [passwordConfirm, setpasswordConfirm] = useState('');
    const { signup, currentUser, setCurrentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const submitButtonDisable = (() => {
        if (name.length === 0 || password.length <= 8 || passwordConfirm !== password) {
            return true;
        }
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email).toLowerCase()) === false) {
            return true;
        }
        const telre = /\+?\d[\d -]{8,12}\d/;
        if (telre.test(String(phone).toLowerCase()) === false) {
            return true;
        }
        return false;
    })();

    async function handleSubmit(e) {
        e.preventDefault();
        //const UserDetails={ }
        if (password !== passwordConfirm) {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setLoading(true);
            const result = await signup(email, password);
            const token = await result.user.getIdToken();
            const res = await fetch(`http://localhost:3030/api/users/new`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json', Authorization: token },
                body: JSON.stringify({
                    name: name,
                    phone: phone,
                    email: result.user.email,
                    uid: result.user.uid,
                }),
            });
            if (res) {
                history.push('/myaccount');
                const userData = {
                    name: name,
                    phone: phone,
                    email: result.user.email,
                    uid: result.user.uid,
                    token: token,
                };
                localStorage.setItem('userData', JSON.stringify(userData));
            }
        } catch (err) {
            console.log(err);
            setError('Failed to create an account');
        }

        setLoading(false);
    }

    const signInWithGoogle = () => {
        auth.signInWithPopup(googleProvider)
            .then((res) => {
                setCurrentUser(res.user);
                res.user.getIdToken().then((token) => {
                    axios
                        .post(
                            `http://localhost:3030/api/users/new`,
                            {
                                name: res.user.displayName,
                                phone: res.user.phoneNumber,
                                email: res.user.email,
                                uid: res.user.uid,
                            },
                            {
                                headers: { Authorization: token },
                            }
                        )
                        .catch((err) => console.log(err));
                    const userData = {
                        name: res.user.displayName,
                        phone: res.user.phoneNumber,
                        email: res.user.email,
                        uid: res.user.uid,
                        token: token,
                    };
                    localStorage.setItem('userData', JSON.stringify(userData));
                });
                history.push('/');
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <Container fluid className="food-background">
            <Row>
                <Col md={4} lg={6} className="d-none d-md-flex bg-image hidecol">
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1502301103665-0b95cc738daf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
                            height="800px"
                            width="700px"
                            alt="home"
                        />
                    </div>
                </Col>
                <Col md={8} lg={6} className="resize">
                    <div
                        className="login d-flex align-items-center pb-5alt
py-5alt py-5"
                    >
                        <Container>
                            <Row>
                                <Col
                                    md={9}
                                    lg={8}
                                    className="loginbox mx-auto pb-5alt
py-5alt pl-5 pr-5"
                                >
                                    <h3 className="login-heading mb-4">
                                        <img className="mr-3" src="/img/logo-fd-round.png" alt="logo"></img>New Buddy!
                                    </h3>
                                    {error && <Alert variant="danger">{error}</Alert>}
                                    <Form onSubmit={handleSubmit}>
                                        <Input
                                            filled={name !== ''}
                                            name="name"
                                            Label="Name"
                                            type="text"
                                            value={name}
                                            change={(e) => {
                                                setname(e.target.value);
                                            }}
                                        />
                                        <Input
                                            filled={phone !== ''}
                                            name="phone"
                                            Label="Phone"
                                            type="tel"
                                            value={phone}
                                            change={(e) => {
                                                setphone(e.target.value);
                                            }}
                                        />
                                        <Input
                                            filled={email !== ''}
                                            type="email"
                                            Label="Email"
                                            name="email"
                                            value={email}
                                            change={(e) => {
                                                setemail(e.target.value);
                                            }}
                                        />
                                        <Input
                                            filled={password !== ''}
                                            type="password"
                                            Label="Password (Minimum 9 Characters)"
                                            name="password"
                                            value={password}
                                            change={(e) => {
                                                setpassword(e.target.value);
                                            }}
                                        />
                                        <Input
                                            filled={passwordConfirm !== ''}
                                            type="password"
                                            Label="Confirm Password"
                                            name="passwordConfirm"
                                            value={passwordConfirm}
                                            change={(e) => {
                                                setpasswordConfirm(e.target.value);
                                            }}
                                        />
                                        <Button
                                            type="submit"
                                            disabled={loading || submitButtonDisable}
                                            className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                                        >
                                            Sign Up
                                        </Button>
                                        <div className="text-center pt-3">
                                            Already have an account?{' '}
                                            <Link className="font-weight-bold" to="/login">
                                                Sign In
                                            </Link>
                                        </div>
                                        <hr className="my-4" />
                                        <p className="text-center">SIGN UP WITH</p>
                                        <div className="row w100 padzero">
                                            <div className="col padzero pr-2 ">
                                                <Button
                                                    className=" btn pl-1 pr-1 btn-lg btn-google font-weight-normal text-white btn-block text-uppercase"
                                                    onClick={signInWithGoogle}
                                                >
                                                    <FontAwesome icon="google" className="mr-2" /> Google
                                                </Button>
                                            </div>
                                        </div>
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;
