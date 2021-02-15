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
	             
	            </Row>
			    </div>
		    </>
    	);
    }

export default Offers;