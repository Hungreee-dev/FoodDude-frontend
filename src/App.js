import React, { Suspense, lazy } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

//Context
import { AuthProvider } from './contexts/AuthContext';
import { OrderProvider } from './contexts/OrderContext';
import PrivateRoute from './PrivateRoute';

//styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-select2-wrapper/css/select2.css';
import './App.css';

import Loader from './components/Loader/index';

//Routes
const Header = lazy(() => import('./components/common/Header'));
const Footer = lazy(() => import('./components/common/Footer'));
const Index = lazy(() => import('./components/Index'));
const Offers = lazy(() => import('./components/Offers'));
const MyAccount = lazy(() => import('./components/MyAccount'));
const List = lazy(() => import('./components/List'));
const NotFound = lazy(() => import('./components/NotFound'));
const Thanks = lazy(() => import('./components/Thanks'));
const Extra = lazy(() => import('./components/Extra'));
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));
const TrackOrder = lazy(() => import('./components/TrackOrder'));
const Invoice = lazy(() => import('./components/Invoice'));
const Checkout = lazy(() => import('./components/Checkout'));
const Detail = lazy(() => import('./components/Detail'));
const AboutUs = lazy(() => import('./components/staticPages/AboutUs'));
const RefundPolicy = lazy(() => import('./components/staticPages/RefundPolicy.js'));
const Terms = lazy(() => import('./components/staticPages/TermsOfServices.js'));
const PrivacyPolicy = lazy(() => import('./components/staticPages/PrivacyPolicy.js'));
const ContactUs = lazy(() => import('./components/staticPages/ContactUS/Index.js'));
const Fail = lazy(() => import('./components/Fail'));

function App(props) {
    var hist = createBrowserHistory();
    return (
        <>
            <OrderProvider>
                <AuthProvider>
                    <Router history={hist}>
                        <Suspense fallback={<Loader />}>
                            <Header />
                            <Switch>
                                <Route path="/" exact component={Index} />
                                <PrivateRoute path="/offers" exact component={Offers} />
                                <Route path="/listing" exact component={List} />
                                <PrivateRoute path="/myaccount" component={MyAccount} />
                                <Route path="/404" exact component={NotFound} />
                                <Route path="/extra" exact component={Extra} />
                                <Route path="/login" exact component={Login} />
                                <Route path="/register" exact component={Register} />
                                <Route path="/track-order" exact component={TrackOrder} />
                                <Route path="/invoice" exact component={Invoice} />
                                <Route path="/about" exact component={AboutUs} />
                                <Route path="/refund" exact component={RefundPolicy} />
                                <Route path="/terms" exact component={Terms} />
                                <Route path="/privacy" exact component={PrivacyPolicy} />
                                <Route path="/contact" exact>
                                    <ContactUs />
                                </Route>
                                <PrivateRoute path="/checkout" component={Checkout} />
                                <PrivateRoute path="/thanks" exact component={Thanks} />
                                <PrivateRoute path="/detail" exact component={Detail} />
                                <PrivateRoute path="/failed" exact component={Fail} />
                                <Route exact component={NotFound} />
                            </Switch>
                            <Footer />

                            {/* {
            (props.location.pathname!=='/login' && props.location.pathname!=='/register') ? <Footer/>:''
          } */}
                        </Suspense>
                    </Router>
                </AuthProvider>
            </OrderProvider>
        </>
    );
}

export default App;
