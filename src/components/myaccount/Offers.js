import React from 'react';
import axios from 'axios'
import {Row,Col} from 'react-bootstrap';
import CouponCard from '../common/CouponCard';
import {BaseUrl} from '../../BaseUrl'


function Offers(props)  {

	const [promoData, setpromoData] = React.useState([]);
	const [recievedData, setRecievedData] = React.useState(false)


	React.useEffect(()=>{
		try{
		const fetchData= async ()=>{
		  const result= await axios.get(`${BaseUrl}/api/promocode/get`) ;
		  
		  if(result.data){
			setpromoData(result.data)
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


    	return (
    		<>
    		    <div className='p-4 bg-white shadow-sm'>
	              <Row>
	               <Col md={12}>
	                  <h4 className="font-weight-bold mt-0 mb-3">Offers For You</h4>
	               </Col>
	              
				   {promoData.map(item=>{
					   return(
						<Col md={6}>
						<CouponCard 
						 title= 'Get 50% OFF on your first osahan eat order'
						 logoImage= 'img/bank/1.png'
						 subTitle= {item.Description}
						 copyBtnText= 'COPY CODE'
						 couponCode= {item.code}
						 noBorder={false}
						/>
				  </Col>
					   )
				   })}
	               <Col md={6}>
	               	  <CouponCard 
						  title= 'Get 50% OFF on your first osahan eat order'
						  logoImage= 'img/bank/2.png'
						  subTitle= 'Use code EAT730 & get 50% off on your first osahan order on Website and Mobile site. Maximum discount: $600'
						  copyBtnText= 'COPY CODE'
						  couponCode= 'EAT730'
						  noBorder={false}
	               	  />
	               </Col>
	               <Col md={6}>
	               	  <CouponCard 
						  title= 'Get 50% OFF on your first osahan eat order'
						  logoImage= 'img/bank/3.png'
						  subTitle= 'Use code SAHAN50 & get 50% off on your first osahan order on Website and Mobile site. Maximum discount: $200'
						  copyBtnText= 'COPY CODE'
						  couponCode= 'SAHAN50'
						  noBorder={false}
	               	  />
	               </Col>
	               <Col md={6}>
	               	  <CouponCard 
						  title= 'Get 50% OFF on your first osahan eat order'
						  logoImage= 'img/bank/4.png'
						  subTitle= 'Use code GURDEEP50 & get 50% off on your first osahan order on Website and Mobile site. Maximum discount: $600'
						  copyBtnText= 'COPY CODE'
						  couponCode= 'GURDEEP50'
						  noBorder={false}
	               	  />
	               </Col>
	               <Col md={6}>
	               	  <CouponCard 
						  title= 'Get 50% OFF on your first osahan eat order'
						  logoImage= 'img/bank/5.png'
						  subTitle= 'Use code OSAHANEAT50 & get 50% off on your first osahan order on Website and Mobile site. Maximum discount: $200'
						  copyBtnText= 'COPY CODE'
						  couponCode= 'OSAHANEAT50'
						  noBorder={false}
	               	  />
	               </Col>
	               <Col md={6}>
	               	  <CouponCard 
						  title= 'Get 50% OFF on your first osahan eat order'
						  logoImage= 'img/bank/6.png'
						  subTitle= 'Use code OSAHANEAT50 & get 50% off on your first osahan order on Website and Mobile site. Maximum discount: $200'
						  copyBtnText= 'COPY CODE'
						  couponCode= 'OSAHANEAT50'
						  noBorder={false}
	               	  />
	               </Col>
	            </Row>
			    </div>
		    </>
    	);
    }

export default Offers;