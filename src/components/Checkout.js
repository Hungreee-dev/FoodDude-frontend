import React from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';
import {Row,Col,Container,Form,InputGroup,Button,Tab,Nav,ButtonToolbar,ToggleButton,ToggleButtonGroup,Image,OverlayTrigger,Tooltip} from 'react-bootstrap';
import ItemsCarousel from './common/ItemsCarousel';
import ChooseAddressCard from './common/ChooseAddressCard';
import CheckoutItem from './common/CheckoutItem';
import AddAddressModal from './modals/AddAddressModal';
import Icofont from 'react-icofont';

function Checkout(props) {

	const [addressModal,showAddressModal]=React.useState(false)
    
   
	const [AddressData, setAddressData] = React.useState([]);
    const [recievedData, setRecievedData] = React.useState(false)
    const {uid,token} = JSON.parse(localStorage.getItem("userData"))
    const [addressId,setAddressId]=React.useState('')
    const [updated,isUpdated]=React.useState()
    const [orderData,setOrderData]=React.useState({})
	
    const [cartData,setCartData]=React.useState([])
    const [totalPrice,setTotalPrice]=React.useState(0)
    const [recievedData2,setRecievedData2]=React.useState(false);
    const [cartItem,setCartItem]=React.useState()
	React.useEffect(()=>{
	  try{
		  console.log(uid)
	  const fetchData= async ()=>{
		const result= await axios.post(`http://localhost:3030/api/users/address/get-all`,{
			uid:uid
		},{
			headers:{Authorization:token}
		}) ;
		
		if(result.data){
			
		  setAddressData(result.data)
		  setRecievedData(true)
		}
	  
		else {
		 console.log("error")
		} 
	}
	  fetchData();
	  
	}catch(err){
		console.log(err);
	  }
	
	},[updated]);
	const hideAddressModal = () => showAddressModal(false);
	React.useEffect(()=>{
		try{
	   if(uid)	{	
		setTotalPrice(0) 
		const fetchData= async ()=>{
		  const result= await axios.post(`http://localhost:3030/api/users/cart/get`,{
			  uid:uid
		  },{
			  headers:{Authorization:token}
		  }) ;
		  
		  if(result.data){
			let tprice=0;
			  setCartData(result.data)
			 for(let item of result.data){
				tprice+=item.quantity*item.price
				 setTotalPrice(tprice)
			 } 
			 
			 
			 setRecievedData2(true)
		  }
		
		  else {
		   console.log("error")
		  } 
	  }
	   
	  fetchData();
		}
	  }catch(err){
		  console.log(err);
		}
	  
	  },[props.cartUpdated]);
  
	React.useEffect(()=>{
	if(recievedData2){
	 
	  setCartItem(cartData.map((item)=>{
		console.log(item)
		return (
		 <CheckoutItem 
		   itemName={`${item.name}`}
		  price={item.price}
		  priceUnit="₹"
		  id={item.name}
		  qty={item.quantity}
		  show={true}
		 
		  getValue={getQty}
		/>
		)
	  }) )
	  setRecievedData2(false)
	}
	})
  
	const getQty = async ({id,quantity,price}) => {
  
	  const item={
		name:id,
		quantity:quantity,
		price:price
	  }
	  
	 const result = await axios.post(`http://localhost:3030/api/users/cart/add`,{
	   item:item,
	   uid:uid
	 },{
	   headers:{
		 Authorization:token
	   }
	 })
	 if(result){
	   props.setCartUpdated(Math.random())
	 }
   }

	
    	return (
    		<section className="offer-dedicated-body  pt-2 pb-2 food-background">
    		  <AddAddressModal show={addressModal} onHide={hideAddressModal} isUpdated={isUpdated} />
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
	                        <div className="pt-3"></div>
	                        <Row>
	                           {AddressData.map((item,index)=>{
									 return(
										 <Col md={6}>
											 <ChooseAddressCard
												 boxclassName={`border border-success bg-green`}
												 title='Address'
												 icoIcon='home'
												 iconclassName='icofont-3x'
												 address={`${item.housenumber}, ${item.line1}, ${item.line2}, ${item.city},${item.state} ${item.pincode} India`}
											     onDeliverHereClick={()=>{
													setOrderData(prevState=>({
													 ...prevState,
													 addressData:item
												 }))}}
											 />
										 </Col>
									 )
							   })}
	                           {/* <Col md={6}>
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
	                           </Col> */}
							   <Col md={12}>
							<div style={{display:'flex',justifyContent:'center'}}> 
							<Button type='button' onClick={()=>{showAddressModal(true)}} variant="primary" className='d-flex w-50 text-center justify-content-center'>Add Address</Button>
							</div>
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
                           <h6 className="mb-1 text-white">Food Dude - Your Order 
                           </h6>
                           {/* <p className="mb-0 text-white"><Icofont icon="location-pin" /> 2036 2ND AVE, NEW YORK, NY 10029</p> */}
                        </div>
                     </div>
                     <div className="bg-white rounded shadow-sm mb-2">
                     	{/* <CheckoutItem 
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
                     	 /> */}
						  {cartItem}
              		 </div>
              		 <div className="mb-2 bg-white rounded p-2 clearfix">
                        <InputGroup className="input-group-sm mb-2">
                           <Form.Control type="text" placeholder="Enter promo code" />
                           <InputGroup.Append>
                              <Button variant="primary" type="button" id="button-addon2"><Icofont icon="sale-discount" /> APPLY</Button>
                           </InputGroup.Append>
                        </InputGroup>
                        {/* <InputGroup className="mb-0">
                           <InputGroup.Prepend>
                              <InputGroup.Text><Icofont icon="comment" /></InputGroup.Text>
                           </InputGroup.Prepend>
                           <Form.Control as="textarea" placeholder="Any suggestions? We will pass it on..." aria-label="With textarea" />
                        </InputGroup> */}
                     </div>
                     <div className="mb-2 bg-white rounded p-2 clearfix">
                        <p className="mb-1">Item Total <span className="float-right text-dark">₹{totalPrice}</span></p>
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