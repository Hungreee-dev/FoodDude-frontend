import React,{useEffect, useState} from 'react';
import axios from 'axios'
import {Link,useHistory} from 'react-router-dom';
import {Row,Col,Container,Form,InputGroup,Button,Tab,Nav,ButtonToolbar,ToggleButton,ToggleButtonGroup,Image,OverlayTrigger,Tooltip,Modal,Alert} from 'react-bootstrap';
import ItemsCarousel from './common/ItemsCarousel';
import ChooseAddressCard from './common/ChooseAddressCard';
import CheckoutItem from './common/CheckoutItem';
import AddAddressModal from './modals/AddAddressModal';
import Icofont from 'react-icofont';
import {useAuth} from '../contexts/AuthContext'
import {BaseUrl,BaseUrl2} from '../BaseUrl'
import Header from './common/Header'
import Footer from './common/Footer'
import Thanks from './Thanks'
import Fail from './Fail'
function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}


function Checkout(props) {

	const history=useHistory()
	const [addressModal,showAddressModal]=React.useState(false)

	const promocodeRef=React.useRef()
	const [promocodeMssg,setPromocodeMssg]=React.useState('')
	const [AddressData, setAddressData] = React.useState([]);
    const [recievedData, setRecievedData] = React.useState(false)
    const {uid,token,name,email,phone} = JSON.parse(localStorage.getItem("userData"))
    const [updated,isUpdated]=React.useState()
    const [orderData,setOrderData]=React.useState({})
	const {cartUpdated,updateCart}=useAuth()
    const [cartData,setCartData]=React.useState([])
    const [totalPrice,setTotalPrice]=React.useState(0)
    const [recievedData2,setRecievedData2]=React.useState(false);
	const [cartItem,setCartItem]=React.useState()
	const [checkingPromocode,setCheckingPromocode]=React.useState(false)
	const [cashOrder,setcashOrder] = useState(false);
  const [promoPercentage,setpromoPercentage] = useState(0);
	const [discountPrice,setdiscountPrice]  = useState(0);
	const[addressAlert,setAddressAlert] = useState(false);
	const [applyPromocode, setapplyPromocode] = useState('');
	
	//RAZORPAY CALL
	async function displayRazorpay() {
		
	if(orderData.addressData == undefined){
		 setAddressAlert(true)
		}
	else{		
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		 }
		 const discount = totalPrice-discountPrice;
		const totalAmount= discountPrice+49;
     
		const data = await fetch(`${BaseUrl2}/api/payment/razorpay`, {
			 method: 'POST',
			 headers:{'Content-Type':"application/json",Authorization:token},
			 body:JSON.stringify({
				 type:1,
				 uid:uid,
				 price:totalAmount
			 })

			})
			.then((t) =>
			t.json()
		)

		console.log(data)
       
		const options = {
			key:process.env.REACT_APP_RAZORPAY_API_KEY,
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: 'Food Order',
			description: 'Thank you for nothing. Please give us some money',
			image: '/img/logo-fd-round.png',
			handler: function (response) {
				const newdate=new Date();
				axios.post(`${BaseUrl}/api/order/add`, {
					userId: uid,
					Address:orderData.addressData,
					items:orderData.cartData,
					billing:{
						baseprice:totalPrice,
						discount :discount,
						deliveryCharge:49,
						finalAmount:totalAmount,
						promocode : applyPromocode,
                        orderTime:{
							timestamp:newdate.getTime()
						},
						paymentMethod:'ONLINE'
					},
					orderStatus:0,
					paymentId:response.razorpay_payment_id,
					id:response.razorpay_order_id,
					RazorpaySignature:response.razorpay_signature,	
				}, {
					headers: { Authorization: token }
				}).then(t=>{
					console.log(t);	
					if(t){
 					  history.push("./thanks");
 					}
 					
			  	}).catch(err=>{console.log(err.response)})
				axios.post(`${BaseUrl2}/api/users/cart/delete`, {
					uid: uid
				}, {
					headers: { Authorization: token }
				}).catch(err=>{console.log(err.response)})
				axios.post(`${BaseUrl2}/api/users/add-order-id`, {
					uid: uid,
					orderId:response.razorpay_order_id
				}, {
					headers: { Authorization: token }
				}).catch(err=>{console.log(err.response)})
				// console.log(response)
				// alert(response.razorpay_payment_id)
				// alert(response.razorpay_order_id)
				// alert(response.razorpay_signature)
			},
			
			prefill: {
				name:name,
				email: email,
				phone_number: phone
			}

		}
		
		const paymentObject = new window.Razorpay(options)
	    paymentObject.open();
		// document.getElementsByClassName("modal-close").addEventListener('click',()=>{
		// 	console.log("cliked");
		// })
		paymentObject.on('payment.failed', function (response){
		    console.log(response);		 
		 	history.push("./failed");
		 	console.log("Payment failed");
		 });
	}	
}

	//ADDRESS CALL
	React.useEffect(()=>{
	
	  try{
	  const fetchData= async ()=>{
		const result= await axios.post(`${BaseUrl2}/api/users/address/get-all`,{
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


	//CART CALL
	React.useEffect(()=>{
		try{
	   if(uid)	{
		setTotalPrice(0)
		const fetchData= async ()=>{
		  const result= await axios.post(`${BaseUrl2}/api/users/cart/get`,{
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
				 setdiscountPrice(tprice)
			 }

			 setOrderData(order=>({
				 ...order,
				cartData:result.data
			 }))
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

	  },[cartUpdated]);

	//UPDATING CART
	React.useEffect(()=>{
	if(recievedData2){
	  setCartItem(cartData.map((item)=>{
		return (
		 <CheckoutItem
		   itemName={`${item.name}`}
		  price={parseInt(item.price)}
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

	 const result = await axios.post(`${BaseUrl2}/api/users/cart/add`,{
	   item:item,
	   uid:uid
	 },{
	   headers:{
		 Authorization:token
	   }
	 })
	 if(result){
	   updateCart()
	 }
   }

   //CHECK PROMOCODE

   React.useEffect(()=>{
	console.log(uid);
	if(checkingPromocode){
		setpromoPercentage(0);
		setPromocodeMssg('');
	  //   console.log(uid)
	const promocodeString=promocodeRef.current.value;
	const fetchData= async ()=>{
		try{
		const result= await axios.post(`${BaseUrl2}/api/promocode/check-promocode`,{
		  uid:uid,
		  promocode:promocodeString.toUpperCase()
	  },{
		  headers:{
			  Authorization:token
			}
	  });
	  setPromocodeMssg(result.data)
      console.log(result.data);
	  //if Promocode is valid 
         console.log(result.data.error);

		if(result.data.error === false){
         const percent = result.data.promocode.Percentage;
		 setpromoPercentage(percent);
         setapplyPromocode(promocodeString.toUpperCase());
     //here is changing the discount price		 
		const amt = ((parseInt(totalPrice)* percent /100));
		const pr = totalPrice - amt;
         setdiscountPrice(pr);
		}
	 }catch(err){
		 //restoring the totalPrice
		    setdiscountPrice(totalPrice);
			setPromocodeMssg({message:"Not Available"});
  }}
  fetchData(); 
  setCheckingPromocode(false);
}
});

   const hideAddressModal = () => showAddressModal(false);

//for Hide and show Modal on click pay
	const cashorder=()=>{
		console.log("addresss");
		console.log(orderData.addressData);
		if(orderData.addressData != undefined){
			setAddressAlert(false);
		    setcashOrder(true);
		}
		else{		   
		   setcashOrder(false);
		   setAddressAlert(true);		
  	   }  
   }
	 const cancelcashOrder=()=>{
		setcashOrder(false);
		setAddressAlert(false);
	}

   useEffect(()=>{
	
   },[])
//For Cash Payment
	async function cashPay(){
		console.log(uid);
	
	const discount = totalPrice-discountPrice;
    const totalAmount= discountPrice+49;
	 try{
	   const resdata = await fetch(`${BaseUrl2}/api/payment/razorpay`, {
			 method: 'POST',
			 headers:{'Content-Type':"application/json",Authorization:token},
			 body:JSON.stringify({
				 type:0,
				 uid:uid,
				 price: totalAmount
			 })
			}).then((res) =>res.json());
		if(resdata.error == false){

		const order_id= resdata.message;	
		const newdate=new Date();
		await axios.post(`${BaseUrl}/api/order/add`, {
			userId: uid,
			Address:orderData.addressData,
			items:orderData.cartData,
			billing:{
				baseprice :totalPrice,
				discount : discount,
				deliveryCharge:49,
				finalAmount	:totalAmount,
				promocode : applyPromocode,
				orderTime:{
					timestamp: newdate.getTime()
				},
				paymentMethod:'CASH',
			},
			id:order_id,
		    orderStatus:0,	
		}, {
			headers: { Authorization: token }
		}).then(t=>{	
			console.log(t.data);
			if(t){
			   history.push("./thanks");
			}
		  }).catch(err=>{console.log(err.response)})
					
		  axios.post(`${BaseUrl2}/api/users/cart/delete`, {
			uid: uid
		}, {
			headers: { Authorization: token }
		}).catch(err=>{console.log(err.response)})
		axios.post(`${BaseUrl2}/api/users/add-order-id`, {
			uid: uid,
			orderId:order_id
		}, {
			headers: { Authorization: token }
		}).catch(err=>{console.log(err.response)})
	   }
	   else{
         
	   }
	}
	 catch(err){
		 console.log(err);
	 }
	}



   return ( 
    		<section className="offer-dedicated-body  pt-2 pb-2 food-background">
				{/* <Header/> */}
    		  <AddAddressModal show={addressModal} onHide={hideAddressModal} isUpdated={isUpdated}  />
	         <Container>
	            <Row>
	               <Col md={8} >
	                  <div className="offer-dedicated-body-left" >
	                    
						 <div className="pt-2" ></div>
						 <div className="bg-white rounded shadow-md p-4 mb-4 food-background text-center" >
	                        <h3 className="mb-1">Choose a delivery address</h3>
	                        <div className="pt-3"></div>
							<Form>
						    <Row >
                     <Col className="col-md-6 mx-auto" >
	                   {AddressData.map((item,index)=>{
									 return(
										 <Row style= {{width:"100%",margin:"auto", display:"block"}}>
											<Form.Check
											inline
											type='radio'
											name='address-radio'
											id={`${item.housenumber},${item.pincode}`}
											onClick={()=>{
												setOrderData(prevState=>({
															...prevState,
															addressData:item
														}))
											}}
											label={<ChooseAddressCard

												boxclassName={`border border-success bg-green`}
												title='Address'
												icoIcon='home'
												iconclassName='icofont-3x'
												address={`${item.housenumber}, ${item.line1}, ${item.line2}, ${item.city},${item.state} ${item.pincode} India`}
											/>}>
											 </Form.Check>
										 </Row>
									 )
							   })}
								 </Col>
	                           <Col md={12}>
							<div style={{display:'flex',justifyContent:'center'}}>
							<Button type='button' onClick={()=>{showAddressModal(true)}} variant="primary" className='d-flex w-50 text-center justify-content-center'>Add Address</Button>
							</div>
						</Col>

	                        </Row>
							</Form>
	                     </div>
						 <div className="pt-2"></div>

	                  </div>
	               </Col>
	               <Col md={4}>
	               	<div className="generator-bg rounded shadow-sm mb-4 p-4 osahan-cart-item">
                     <div className="d-flex mb-4 osahan-cart-item-profile">
                        <Image fluid className="mr-3 rounded-pill" alt="osahan" src="/img/logo-fd-round.png" />
                        <div className="d-flex flex-column">
                           <h6 className="mb-1 text-white">Food Dude - Your Order
                           </h6>
                        </div>
                     </div>
                     <div className="bg-white rounded shadow-sm mb-2">
                     	  {cartItem}
              		 </div>
              		 <div className="mb-2 bg-white rounded p-2 clearfix">
                        <InputGroup className="input-group-sm mb-2">
                           <Form.Control type="text" placeholder="Enter promo code" ref={promocodeRef} style={{textTransform:'uppercase'}} />
                           <InputGroup.Append>
                              <Button variant="primary" type="button" onClick={()=>{setCheckingPromocode(true)}} id="button-addon2"><Icofont icon="sale-discount" /> APPLY</Button>
                           </InputGroup.Append>
                        </InputGroup>
						<p style={{color:'green',fontWeight:'500'}}>{promocodeMssg.message}</p>
                       
                     </div>
                     <div className="mb-2 bg-white rounded p-2 clearfix">
                        <p className="mb-1">Item Total <span className="float-right text-dark">₹{totalPrice}</span></p>
											  <p className="mb-1">Discount% <span className="float-right text-dark">₹{totalPrice*(promoPercentage/100)}</span></p>
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
                           <span className="float-right text-dark">₹49</span>

                        </p>
                       
                        <hr />
                        <h6 className="font-weight-bold mb-0">TO PAY  <span className="float-right">₹{discountPrice+49}</span></h6>
                     </div>
							 <Button variant='warning' className="btn btn-block btn-lg" onClick={cashorder}>Cash On Delivery
							<Icofont icon="icofont-rupee"/> ₹{discountPrice+49}	<Icofont icon="long-arrow-right" /></Button>
                 	<Button variant='success' onClick={()=>{displayRazorpay()}} className="btn btn-block btn-lg">Pay Now ₹{discountPrice+49}
                 	<Icofont icon="long-arrow-right" /></Button>
	   				</div>

           {/*
						Cash Payment Confirmation modal and address Alert modal
					*/ }
			<Modal id = "cashModal" show={cashOrder} onHide={cancelcashOrder} style= {{margin:"250px auto 0px auto",borderRadius:"30px"}} >
           <Modal.Header  closeButton>
              <h3 style={{marginLeft:"14%"}}> Please Confirm your Order</h3>
           </Modal.Header>
                 <Modal.Body class="my-3 text-center">
								 <h4 class="mt-3 mb-2" >Cash On Delivery ₹{discountPrice+49}</h4>
                 <button class= "btn btn-success p-3 m-4 rounded-pill" onClick={cashPay}>Confirm Order<Icofont icon="tick-mark" /></button>
                 <button class= "btn btn-danger p-3 m-4 rounded-pill" onClick={cancelcashOrder}>Cancel Order<Icofont icon="close" /></button>
                </Modal.Body>

          </Modal>
		  <Modal id = "addressAlert" show= {addressAlert} onHide={cancelcashOrder} style= {{margin:"250px auto 0px auto"}} >
           <Modal.Header  closeButton>
           </Modal.Header>
                 <Modal.Body class="my-3 text-center">
								 <h4 class="mt-3 mb-2" >Select Delivery Address!!</h4>
             </Modal.Body>
          </Modal>
		   
				     

	               </Col>
	            </Row>
	         </Container>
			 {/* <Footer /> */}
	      </section>


    	);
    }




export default Checkout;
