import React from 'react';
import {Link} from 'react-router-dom';
import {Row,Col,Container,Form,InputGroup,Button,Tab,Nav,ButtonToolbar,ToggleButton,ToggleButtonGroup,Image,OverlayTrigger,Tooltip} from 'react-bootstrap';
import ItemsCarousel from './common/ItemsCarousel';
import ChooseAddressCard from './common/ChooseAddressCard';
import CheckoutItem from './common/CheckoutItem';
import AddAddressModal from './modals/AddAddressModal';
import Icofont from 'react-icofont';

function Checkout(props) {

	const [addressModal,showAddressModal]=React.useState(false)

   const hideAddressModal = () => showAddressModal(false);
   const  getQty = ({id,quantity}) => {
    	//console.log(id);
    	//console.log(quantity);
	}

	
    	return (
    		<section className="offer-dedicated-body  mb-4 pt-2 pb-2 food-background">
    		 <AddAddressModal show={addressModal} onHide={hideAddressModal}/>
	         <Container>
	            <Row>
	               <Col md={8}>
	                  <div className="offer-dedicated-body-left" >
	                     {/* <div className="bg-white rounded shadow-sm p-4 mb-4">
	                        <h6 className="mb-3">You may also like</h6>
	                        <ItemsCarousel />
	                     </div> */}
						 <div className="pt-2"></div>
						 <div className="bg-white rounded shadow-md p-4 mb-4" >
	                        <h3 className="mb-1">Choose a delivery address</h3>
	                        <div className="pt-"></div>
	                        <Row>
	                           <Col md={6}>
				               	  <ChooseAddressCard 
				               	  	  boxclassName="border border-success"
									  title= 'Work'
									  icoIcon= 'briefcase'
									  iconclassName= 'icofont-3x'
									  address= 'NCC, Model Town Rd, Pritm Nagar, Model Town, Ludhiana, Punjab 141002, India'
				               	  />
	                           </Col>
	                           <Col md={6}>
				               	  <ChooseAddressCard 
									  title= 'Work'
									  icoIcon= 'briefcase'
									  iconclassName= 'icofont-3x'
									  address= 'NCC, Model Town Rd, Pritm Nagar, Model Town, Ludhiana, Punjab 141002, India'
				               	  />
	                           </Col>
	                           <Col md={6}>
				               	  <ChooseAddressCard 
									  title= 'Work'
									  icoIcon= 'briefcase'
									  iconclassName= 'icofont-3x'
									  address= 'NCC, Model Town Rd, Pritm Nagar, Model Town, Ludhiana, Punjab 141002, India'
				               	  />
	                           </Col>
	                           <Col md={6}>
				               	  <ChooseAddressCard 
									  title= 'Work'
									  icoIcon= 'briefcase'
									  iconclassName= 'icofont-3x'
									  type="newAddress"
									  address= 'NCC, Model Town Rd, Pritm Nagar, Model Town, Ludhiana, Punjab 141002, India'
									  onAddNewClick={() => showAddressModal(true)}
				               	  />
	                           </Col>
	                        </Row>
	                     </div>
						 <div className="pt-2"></div>
	                     
	                  </div>
	               </Col>
	               <Col md={4}>
	               	<div className="generator-bg rounded shadow-sm mb-4 p-4 osahan-cart-item">
                     <div className="d-flex mb-4 osahan-cart-item-profile">
                        <Image fluid className="mr-3 rounded-pill" alt="osahan" src="/img/2.jpg" />
                        <div className="d-flex flex-column">
                           <h6 className="mb-1 text-white">Spice Hut Indian Restaurant
                           </h6>
                           <p className="mb-0 text-white"><Icofont icon="location-pin" /> 2036 2ND AVE, NEW YORK, NY 10029</p>
                        </div>
                     </div>
                     <div className="bg-white rounded shadow-sm mb-2">
                     	<CheckoutItem 
                     		itemName="Chicken Tikka Sub"
							price={314}
							priceUnit="$"
							id={1}
							qty={2}
							show={true}
							minValue={0}
							maxValue={7}
							getValue={getQty}
                     	 />
                     	<CheckoutItem 
                     		itemName="Cheese corn Roll"
							price={260}
							priceUnit="$"
							id={1}
							qty={1}
							show={true}
							minValue={0}
							maxValue={7}
							getValue={getQty}
                     	 />
                     	<CheckoutItem 
                     		itemName="Mixed Veg"
							price={122}
							priceUnit="$"
							id={1}
							qty={1}
							show={true}
							minValue={0}
							maxValue={7}
							getValue={getQty}
                     	 />
                     	<CheckoutItem 
                     		itemName="Black Dal Makhani"
							price={652}
							priceUnit="$"
							id={1}
							qty={1}
							show={true}
							minValue={0}
							maxValue={7}
							getValue={getQty}
                     	 />
                     	<CheckoutItem 
                     		itemName="Mixed Veg"
							price={122}
							priceUnit="$"
							id={1}
							qty={1}
							show={true}
							minValue={0}
							maxValue={7}
							getValue={getQty}
                     	 />
              		 </div>
              		 <div className="mb-2 bg-white rounded p-2 clearfix">
                        <InputGroup className="input-group-sm mb-2">
                           <Form.Control type="text" placeholder="Enter promo code" />
                           <InputGroup.Append>
                              <Button variant="primary" type="button" id="button-addon2"><Icofont icon="sale-discount" /> APPLY</Button>
                           </InputGroup.Append>
                        </InputGroup>
                        <InputGroup className="mb-0">
                           <InputGroup.Prepend>
                              <InputGroup.Text><Icofont icon="comment" /></InputGroup.Text>
                           </InputGroup.Prepend>
                           <Form.Control as="textarea" placeholder="Any suggestions? We will pass it on..." aria-label="With textarea" />
                        </InputGroup>
                     </div>
                     <div className="mb-2 bg-white rounded p-2 clearfix">
                        <p className="mb-1">Item Total <span className="float-right text-dark">$3140</span></p>
                        <p className="mb-1">Restaurant Charges <span className="float-right text-dark">$62.8</span></p>
                        <p className="mb-1">Delivery Fee
                    		<OverlayTrigger
						      key="top"
						      placement="top"
						      overlay={
						        <Tooltip id="tooltip-top">
						          Total discount breakup
						        </Tooltip>
						      }
						    >
						      <span className="text-info ml-1">
							      <Icofont icon="info-circle" />
	                           </span> 
						    </OverlayTrigger>
                           <span className="float-right text-dark">$10</span>
                           
                        </p>
                        <p className="mb-1 text-success">Total Discount 
                           <span className="float-right text-success">$1884</span>
                        </p>
                        <hr />
                        <h6 className="font-weight-bold mb-0">TO PAY  <span className="float-right">$1329</span></h6>
                     </div>
                 	<Link to="/thanks" className="btn btn-success btn-block btn-lg">PAY $1329
                 	<Icofont icon="long-arrow-right" /></Link>
	   				</div>
				      <div className="pt-2"></div>
	                  <div className="alert alert-success" role="alert">
	                     You have saved <strong>$1,884</strong> on the bill
	                  </div>
	   				  <div className="pt-2"></div>
	   				 
	               </Col>
	            </Row>
	         </Container>
	      </section>
    	);
    }



export default Checkout;