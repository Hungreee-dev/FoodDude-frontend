import React,{ Suspense, lazy } from 'react';
import {Switch, Route,Router} from 'react-router-dom';
import { createBrowserHistory } from "history";

//Context
import {AuthProvider} from './contexts/AuthContext';
import PrivateRoute from './PrivateRoute';


//styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-select2-wrapper/css/select2.css';
import './App.css';


//Routes
const Header = lazy(()=>import('./components/common/Header')) ;
const Footer = lazy(()=>import('./components/common/Footer')) ;
const Index = lazy(()=>import('./components/Index')) ;
const Offers = lazy(()=>import('./components/Offers'));
const MyAccount = lazy(()=>import('./components/MyAccount'));
const List = lazy(()=>import('./components/List'));
const NotFound = lazy(()=>import('./components/NotFound'));
const Thanks = lazy(()=>import('./components/Thanks'));
const Extra = lazy(()=>import('./components/Extra'));
const Login = lazy(()=>import('./components/Login'));
const Register = lazy(()=>import('./components/Register'));
const TrackOrder = lazy(()=>import('./components/TrackOrder'));
const Invoice = lazy(()=>import('./components/Invoice'));
const Checkout = lazy(()=>import('./components/Checkout'));
const Detail = lazy(()=>import('./components/Detail'));


function App(props)  {
  var hist = createBrowserHistory();

  const [cartUpdated,setCartUpdated]=React.useState()
    return (
      <>
      <Router history={hist}>
          <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>
          {/* {
            (props.location.pathname!=='/login' && props.location.pathname!=='/register') ? <Header/>:''
          } */}
          <Header cartUpdated={cartUpdated}/>
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
                <PrivateRoute path="/checkout" exact component={Checkout} />
                <PrivateRoute path="/thanks" exact component={Thanks} />
                <Route path="/detail" exact  render={(props)=>(<Detail {...props} cartUpdated={cartUpdated} setCartUpdated={setCartUpdated} />)} />
                <Route exact component={NotFound} />
              </Switch>
           <Footer/>
          
          {/* {
            (props.location.pathname!=='/login' && props.location.pathname!=='/register') ? <Footer/>:''
          } */}
           </AuthProvider>
          </Suspense>
          </Router>
      </>
    );
  }


export default App;
