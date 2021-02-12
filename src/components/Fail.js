import React from 'react';
import {Link} from 'react-router-dom';
import {Row,Col,Container,Image} from 'react-bootstrap';

class Fail extends React.Component {

	render() {
    	return (
    		<section className="section pt-5 pb-5 osahan-not-found-page food-background">
		         <Container>
		            <Row>
		               <Col md={12} className="text-center pt-5 pb-5">
		                  <Image className="img-fluid" src="/img/cancel.png" width="300px" height="300px" alt="404" />
		                  <p className="mt-2 mb-2  display-3 text-danger">Transaction Failed</p>
		                  <p className="mb-5" >Sorry for Failure, If money would have deducted It will returned back to your account within 2 bussiness days</p>
		                  <Link className="btn btn-primary btn-lg" to="/myaccount/orders">GO HOME</Link>
		               </Col>
		            </Row>
		         </Container>
		    </section>
    	);
    }
}


export default Fail;
