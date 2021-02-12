import React,{useState} from 'react';
import axios from 'axios'
import {Link,useHistory} from 'react-router-dom';
import {Row,Col,Container,Form,InputGroup,Button,Tab,Nav,ButtonToolbar,ToggleButton,ToggleButtonGroup,Image,OverlayTrigger,Tooltip,Modal} from 'react-bootstrap';
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
    const [addressId,setAddressId]=React.useState('')
    const [updated,isUpdated]=React.useState()
    const [orderData,setOrderData]=React.useState({})
	const {cartUpdated,updateCart}=useAuth()
    const [cartData,setCartData]=React.useState([])
    const [totalPrice,setTotalPrice]=React.useState(0)
    const [recievedData2,setRecievedData2]=React.useState(false);
	const [cartItem,setCartItem]=React.useState()
	const [checkingPromocode,setCheckingPromocode]=React.useState(false)
	const [cashorder,setcashOrder] = useState(false);
  const [promoPercentage,setpromoPercentage] = useState(0);
	const [discountPrice,setdiscountPrice]  = useState(0);

	//RAZORPAY CALL
	async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}
     const amount= discountPrice+49;

		const data = await fetch(`http://localhost:3030/api/payment/razorpay`, {
			 method: 'POST',
			 headers:{'Content-Type':"application/json",Authorization:token},
			 body:JSON.stringify({
				 type:1,
				 uid:uid,
				 price:amount
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
						promoCode:'',
						finalAmount:totalPrice,
						discount:'',
						deliveryCharge:''
					},
					paymentId:response.razorpay_payment_id,
					id:response.razorpay_order_id,
					RazorpaySignature:response.razorpay_signature,
					paymentMethod:'ONLINE',
					orderTime:{
						timestamp:newdate.getTime()
					}
				}, {
					headers: { Authorization: token }
				}).then(t=>{
					console.log("whatis");
					console.log(t);
					var callurl;
 					if(t.success){
 					  history.push("./thanks");
 					}
 					else{
						console.log("value of t");
						console.log(t);
 						history.push("./failed");
 					}
			  	}).catch(err=>{console.log(err.response)})
				axios.post(`${BaseUrl2}api/users/cart/delete`, {
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
		paymentObject.open()
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
	if(checkingPromocode){
		setpromoPercentage(0);
		setPromocodeMssg('');

	  //   console.log(uid)
	  const promocodeString=promocodeRef.current.value

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

		if(result.data.promocode.Percentage>0){
    const percent = result.data.promocode.Percentage;
		setpromoPercentage(percent);

		const amt = ((parseInt(totalPrice)* percent /100));
		const pr = totalPrice - amt;
    setdiscountPrice(pr);
		console.log("discountPrice ");
    console.log(discountPrice);
	 }

	 else{
		 setdiscountPrice(totalPrice);
     console.log(discountPrice);
	 }
	 }catch(err){
	console.log(err);
  }}
	fetchData();
	setCheckingPromocode(false)
}
});

   const hideAddressModal = () => showAddressModal(false);

//for Hide and show Modal
	 const cashOrder=()=>{
		setcashOrder(true);
	}
	 const cancelcashOrder=()=>{
		setcashOrder(false);
	}

//For Cash Payment
	async function cashPay(){
   const amount = discountPrice+49;
	 try{
		await fetch(`http://localhost:3030/api/payment/razorpay`, {
			 method: 'POST',
			 headers:{'Content-Type':"application/json",Authorization:token},
			 body:JSON.stringify({
				 type:0,
				 uid:uid,
				 price: amount
			 })
			}).then((res) =>res.json())
			.then((res)=>{
					console.log(res);
					axios.post(`${BaseUrl2}/api/users/cart/delete`, {
						uid: uid
					}, {
						headers: { Authorization: token }
					}).catch(err=>{console.log(err.response)})
					axios.post(`${BaseUrl2}/api/users/add-order-id`, {
						uid: uid,
						orderId:res.id
					}, {
						headers: { Authorization: token }
					}).catch(err=>{console.log(err.response)})
					history.push('./thanks');
			});
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
	                     {/* <div className="bg-white rounded shadow-sm p-4 mb-4">
	                        <h6 className="mb-3">You may also like</h6>
	                        <ItemsCarousel />
	                     </div> */}
						 <div className="pt-2" ></div>
						 <div className="bg-white rounded shadow-md p-4 mb-4 food-background text-center" >
	                        <h3 className="mb-1">Choose a delivery address</h3>
	                        <div className="pt-3"></div>
							<Form>
						    <Row >
                     <Col className="col-md-6" style={{margin:"auto"}}>
	                   {AddressData.map((item,index)=>{
									 return(
										 <Row>

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
                           <Form.Control type="text" placeholder="Enter promo code" ref={promocodeRef} style={{textTransform:'uppercase'}} />
                           <InputGroup.Append>
                              <Button variant="primary" type="button" onClick={()=>{setCheckingPromocode(true)}} id="button-addon2"><Icofont icon="sale-discount" /> APPLY</Button>
                           </InputGroup.Append>
                        </InputGroup>
						<p style={{color:'green',fontWeight:'500'}}>{promocodeMssg.message}</p>
                        {/* <InputGroup className="mb-0">
                           <InputGroup.Prepend>
                              <InputGroup.Text><Icofont icon="comment" /></InputGroup.Text>
                           </InputGroup.Prepend>
                           <Form.Control as="textarea" placeholder="Any suggestions? We will pass it on..." aria-label="With textarea" />
                        </InputGroup> */}
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
                        {/* <p className="mb-1 text-success">Total Discount
                           <span className="float-right text-success">$1884</span>
                        </p> */}
                        <hr />
                        <h6 className="font-weight-bold mb-0">TO PAY  <span className="float-right">₹{discountPrice+49}</span></h6>
                     </div>
										 <Button variant='warning' className="btn btn-block btn-lg" onClick={cashOrder}>Cash On Delivery
										<Icofont icon="icofont-rupee"/> ₹{discountPrice+49}	<Icofont icon="long-arrow-right" /></Button>
                 	<Button variant='success' onClick={()=>{displayRazorpay()}} className="btn btn-block btn-lg">Pay Now ₹{discountPrice+49}
                 	<Icofont icon="long-arrow-right" /></Button>
	   				</div>

           {/*
						Cash Payment Confirmation modal
					*/ }
						<Modal id = "cashModal" show= {cashorder} onHide={cancelcashOrder} style= {{margin:"250px auto 0px auto",borderRadius:"30px"}} >
           <Modal.Header  closeButton>
              <h3 style={{marginLeft:"14%"}}> Please Confirm your Order</h3>
           </Modal.Header>
                 <Modal.Body class="my-3 text-center">
								 <h4 class="mt-3 mb-2" >Cash On Delivery ₹{discountPrice+49}</h4>
                 <button class= "btn btn-success p-3 m-4 rounded-pill" onClick={cashPay}>Confirm Order<Icofont icon="tick-mark" /></button>
                 <button class= "btn btn-danger p-3 m-4 rounded-pill" onClick={cancelcashOrder}>Cancel Order<Icofont icon="close" /></button>
                </Modal.Body>
          </Modal>
				      {/* <div className="pt-2"></div>
	                  <div className="alert alert-success" role="alert">
	                     You have saved <strong>$1,884</strong> on the bill
	                  </div>
	   				  <div className="pt-2"></div> */}

	               </Col>
	            </Row>
	         </Container>
			 {/* <Footer /> */}
	      </section>


    	);
    }



export default Checkout;
