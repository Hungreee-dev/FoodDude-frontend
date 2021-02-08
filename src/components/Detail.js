import React from 'react';
import axios from 'axios'
import {useHistory} from 'react-router-dom';
import {Row,Col,Container,Form,InputGroup,Button,Tab,Nav,Image,Badge} from 'react-bootstrap';
import ItemsCarousel from './common/ItemsCarousel';
import GalleryCarousel from './common/GalleryCarousel';
import CheckoutItem from './common/CheckoutItem';
import BestSeller from './common/BestSeller';
import QuickBite from './common/QuickBite';
import Cart from './Order/Cart'
import Icofont from 'react-icofont';
import {BaseUrl,BaseUrl2} from '../BaseUrl';
import {useAuth} from '../contexts/AuthContext'




function Detail(props) {
const history=useHistory()
const [menu,setMenu]=React.useState([]);
const {updateCart}=useAuth()
const [category,setCategory]=React.useState([])
const [recievedData,setRecievedData]=React.useState(false)
const userData=JSON.parse(localStorage.getItem('userData'));
React.useEffect(()=>{
    try{
    const fetchData= async ()=>{
      const result= await axios.get(`${BaseUrl}/api/menu/get`) ;
      
      if(result.data){
        setMenu(result.data)
		setCategory(result.data.map(item=>{
			return item.Category
		}))
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
  
  },[]);

  const getQty = async ({id,quantity,price}) => {
if(userData){
   const item={
	   name:id,
	   quantity:quantity,
	   price:price
   }
	 
	const result = await axios.post(`${BaseUrl2}/api/users/cart/add`,{
		item:item,
		uid:userData.uid
	},{
		headers:{
			Authorization:userData.token
		}
	})
	if(result){
		updateCart()
	}}else
	history.push('/login')
	
	
}
const getStarValue = ({value}) => {
	console.log(value);
	//console.log(quantity);
}

let MenuData=<></>
	if(recievedData){
		const headings = [...new Set(category)]
		
		  MenuData = headings.map((item)=>{
				 const DishData =[]
				 for(let data of menu){
					 if(data.Category===item){
						 DishData.push(
							<QuickBite 
							id={data.Name}
							title={data.Name}
							showBadge={true}
							badgeVariant={data.Veg?'danger':'success'}
							price={data.Price}
							priceUnit='₹'
							getValue={getQty}
						   />
						 )
					 }
				 }
				 return(
					<Row>
					<h3 className="mb-4 mt-3 col-md-12">{item} <small className="h6 text-black-50">{DishData.length} ITEMS</small></h3>
					<Col md={12}>
					<div className="bg-white rounded border shadow-sm">
						{DishData.map(item1=>{
							
							return item1
						})}
						</div>
						</Col>
						</Row>
				 )
		})
		
	}
   
  



    	return (
		<>
          <Tab.Container defaultActiveKey="first">
	      
		      <section className="offer-dedicated-body pt-2 pb-2 food-background">
		        <Container>
		            <Row>
		  
						<Col md={8}>
						{/* <h5 className="mb-4">Recommended</h5>
		                              <Form className="explore-outlets-search mb-4">
		                                 <InputGroup>
		                                    <Form.Control type="text" placeholder="Search for dishes..." />
		                                    <InputGroup.Append>
		                                       <Button type="button" variant="link">
		                                       	<Icofont icon="search" />
		                                       </Button>
		                                    </InputGroup.Append>
		                                 </InputGroup>
		                              </Form> */}
		                              
			                          
			                              {MenuData}
			                          
			                           
						</Col>
		               <Col md={4}>
		               {/* <div className="bg-white rounded shadow-sm text-white mb-4 p-4 clearfix restaurant-detailed-earn-pts card-icon-overlap">
		                     <Image fluid className="float-left mr-3" src="/img/earn-score-icon.png" />
		                     <h6 className="pt-0 text-primary mb-1 font-weight-bold">OFFER</h6>
		                     <p className="mb-0">60% off on orders above $99 | Use coupon <span className="text-danger font-weight-bold">OSAHAN50</span></p>
		                     <div className="icon-overlap">
		                        <Icofont icon="sale-discount" />
		                     </div>
		                </div> */}
		               	<Cart />
		               </Col>
					</Row>
				</Container>
		      </section>

	      </Tab.Container>
	    </>
    	);
    }



export default Detail;