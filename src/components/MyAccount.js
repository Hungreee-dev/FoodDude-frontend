import React from 'react';
import {Switch,Route} from 'react-router-dom';
import {NavLink,Link } from 'react-router-dom';
import {Row,Col,Container,Image} from 'react-bootstrap';
import Offers from './myaccount/Offers';
import Orders from './myaccount/Orders';
import Favourites from './myaccount/Favourites';
import Payments from './myaccount/Payments';
import Addresses from './myaccount/Addresses';
import EditProfileModal from './modals/EditProfileModal';

function MyAccount(props) {
 const [editProfile,showEditProfile]=React.useState(false)
 const userData=JSON.parse(localStorage.getItem('userData'))

 const hideEditProfile = () => showEditProfile(false);

	
    	return (
    		<>
        <EditProfileModal show={editProfile} onHide={hideEditProfile}/>
        <section className="section pt-4 pb-4 osahan-account-page food-background">
           <Container>
              <Row>
                 <Col md={3}>
                    <div className="osahan-account-page-left shadow-sm bg-white h-100">
                       <div className="border-bottom p-4">
                          <div className="osahan-user text-center">
                             <div className="osahan-user-media">
                               <h5><u>Your Details</u></h5>
                               {userData? <div className="osahan-user-media-body" style={{marginTop:'30px'}}>
                                   <h6 className="mb-2">{userData.name?userData.name:null}</h6>
                                   <p className="mb-1">{userData.phone?userData.phone:null}</p>
                                   <p>{userData.email?userData.email:null}</p>
                                   <p className="mb-0 text-black font-weight-bold"><Link to='#' onClick={() => showEditProfile(true)} className="text-primary mr-3"><i className="icofont-ui-edit"></i> EDIT</Link></p>
                                </div>:null}
                             </div>
                          </div>
                       </div>
                       <ul className="nav flex-column border-0 pt-4 pl-4 pb-4">
                          <li className="nav-item">
                             <NavLink className="nav-link" activeClassName="active" exact to="/myaccount/orders"><i className="icofont-food-cart"></i> Orders</NavLink>
                          </li>
                          <li className="nav-item">
                             <NavLink className="nav-link" activeClassName="active" exact to="/myaccount/offers"><i className="icofont-sale-discount"></i> Offers</NavLink>
                          </li>
                          <li className="nav-item">
                             <NavLink className="nav-link" activeClassName="active" exact to="/myaccount/favourites"><i className="icofont-heart"></i> Favourites</NavLink>
                          </li>
                          <li className="nav-item">
                             <NavLink className="nav-link" activeClassName="active" exact to="/myaccount/payments"><i className="icofont-credit-card"></i> Payments</NavLink>
                          </li>
                          <li className="nav-item">
                             <NavLink className="nav-link" activeClassName="active" exact to="/myaccount/addresses"><i className="icofont-location-pin"></i> Addresses</NavLink>
                          </li>
                       </ul>
                    </div>
                 </Col>
                 <Col md={9}>
                  <Switch>
                    <Route path="/myaccount/orders" exact component={Orders} />
                    <Route path="/myaccount/offers" exact component={Offers} />
                    <Route path="/myaccount/favourites" exact component={Favourites} />
                    <Route path="/myaccount/payments" exact component={Payments} />
                    <Route path="/myaccount/addresses" exact component={Addresses} />
                  </Switch>
                 </Col>
              </Row>
           </Container>
        </section>
    		</>
    	);
    }



export default MyAccount;