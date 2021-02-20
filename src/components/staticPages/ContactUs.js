import React from 'react';
import {Row,Col,Container} from 'react-bootstrap';
import SectionHeading from '../common/SectionHeading';
import FontAwesome from '../common/FontAwesome';
import './termsOfServices.css';
function AboutUs(props){
	
    	return (
    		<>
				<section className="section pt-5 pb-5 bg-white homepage-add-section food-background" >
				
               
					<Container>
						<Row>
							<Col md={12} xs={12} >
                                <blockquote class="blockquote blockquote-custom  p-5 shadow rounded" style={{ background: 'white' }} >
									<SectionHeading
										heading='Contact Us'
										subHeading=''

									/>
									<Row>
							         <Col md={6} xs={12} >
                                    <p class="mb-0 mt-2 font-italic" style={{fontSize:'16px',color:'#454040'}}>
										Your Order is just a call or text away- 6371830551<br/>
										For details mail us at <a href="mailto:info@fooddude.in">info@fooddude.in</a><br/>
										We are also available and accessbile at-<br/>
										<br/>
										<FontAwesome icon='instagram' className="fa-2x"/>&nbsp;&nbsp;<a href="https://www.instagram.com/wefooddude/">wefooddude</a><br/><br/>
										<FontAwesome icon='facebook'  className="fa-2x"/>&nbsp;&nbsp;<a href="https://www.facebook.com/wefooddude/">Food Dude</a><br/><br/>
										<FontAwesome icon='linkedin'  className="fa-2x"/>&nbsp;&nbsp;<a href="https://in.linkedin.com/company/wefooddude">Food Dude</a><br/><br/>
										<FontAwesome icon='twitter'   className="fa-2x"/>&nbsp;&nbsp;<a href="https://mobile.twitter.com/wefooddude">wefooddude</a><br/><br/>
									

                                    </p>
									</Col>
									<Col md={6} xs={12} style={{marginTop:"50px"}} >
                                    <p class="mb-0 mt-2 font-italic" style={{fontSize:'16px',color:'#454040'}}>
										<div style={{textAlign:'center'}} ><h3>Our Address</h3></div>
										<div style={{textAlign:'center'}} >Lane-5A, Gouri Nagar, Old Town Samantarapur,<br/> Bhubaneswar, Khordha, Odisha <br/>Pincode-751002
										</div>
                                    </p>
									</Col>
									</Row>
                                </blockquote>
							</Col>
							{/* <Col md={4} xs={6}>
								<blockquote class="blockquote blockquote-custom  p-5 shadow rounded" style={{height:'300px',background:'#f0f0f0'}}>
									<div class="blockquote-custom-icon bg-info shadow-sm"><i class="fa fa-quote-left text-white"></i></div>
									<h4 className="mb-2 font-weight-normal"><span className="font-weight-bold">Quality</span></h4>
									<p class="mb-0 mt-2 font-italic">"Fooddude provides you the best food ranging from several
							cuisines from the best kitchens throughout the city. We assure you of satisfying your palette minus
							the food colours and unnecessary oil."</p>

								</blockquote>
							</Col>
							<Col md={4} xs={6}>
								<blockquote class="blockquote blockquote-custom  p-5 shadow rounded" style={{background:'#f0f0f0'}}>
									<div class="blockquote-custom-icon bg-info shadow-sm"><i class="fa fa-quote-left text-white"></i></div>
									<h4 className="mb-2 font-weight-normal"><span className="font-weight-bold">Hygiene</span></h4>
									<p class="mb-0 mt-2 font-italic">"The pandemic has forced us to rethink our
							sanitary practices. But, Fooddude promises that you'll never have to think twice while ordering from us.
							Our delivery agents are checked and sanitized regularly
							 and use masks and gloves throughout the process to ensure your food reaches to you safely."</p>

								</blockquote>
							</Col> */}

						</Row>
					</Container>
				</section>



    		</>
    	);
    }



const options={
	responsive: {
        0:{
            items:1,
        },
        600:{
            items:2,
        },
        1000: {
          items: 4,
        },
        1200: {
          items: 4,
        },
      },

        lazyLoad: true,
        pagination: false.toString(),
        loop: true,
        dots: false,
        autoPlay: 2000,
        nav: true,
        navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"]
}




export default AboutUs;