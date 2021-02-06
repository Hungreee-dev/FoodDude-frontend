import React from 'react';
import {Row,Col,Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel3';
import TopSearch from './home/TopSearch';
import ProductBox from './home/ProductBox';
import Header from './common/Header'
import CardItem from './common/CardItem';
import SectionHeading from './common/SectionHeading';
import FontAwesome from './common/FontAwesome';
import Image from '../assets/images/food.png'
function Index(props){
	
    	return (
    		<>
			
    			<TopSearch />
				<section className="section pt-5 pb-5 bg-white homepage-add-section food-background" >
				<SectionHeading
						heading='Our Motto'
						subHeading=''
					/>
					<Container>
						<Row>
							<Col md={4} xs={6} >
								<blockquote class="blockquote blockquote-custom  p-5 shadow rounded" style={{background:'#f0f0f0'}} >
									<div class="blockquote-custom-icon bg-info shadow-sm"><i class="fa fa-quote-left text-white"></i></div>
									<h4 className="mb-2 font-weight-normal"><span className="font-weight-bold">Affordability</span></h4>
									<p class="mb-0 mt-2 font-italic">"The tastiest food doesn't have to be the costliest.
							  In these tough times, it may be very hard for us to spend every time we crave
							  something delicious. Fooddude promises to be the most affordable option you have to satisfy your hunger."</p>

								</blockquote>
							</Col>
							<Col md={4} xs={6}>
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
							</Col>

						</Row>
					</Container>
				</section>

			    <section className="section pt-5 pb-5 products-section">
			         <Container>
			         	<SectionHeading 
			         		heading='Popular Dishes For You'
			         		subHeading='The delectable, lucious, mouthwatering food you can find with us'
			         	/>
			            <Row>
			               <Col md={12}>
			               	  <OwlCarousel nav loop {...options} className="owl-carousel-four owl-theme">
			                     <div className="item">
			                        <CardItem 
								   		title='World Famous'
										subTitle='North Indian • American • Pure veg'
									  	imageAlt='Product'
									    image='img/list/1.png'
									    imageClass='img-fluid item-img'
									    linkUrl='detail'
									    offerText='65% off | Use Coupon OSAHAN50'
										time='20–25 min'
										price='$250 FOR TWO'
										// showPromoted={true}
										promotedVariant='dark'
										// favIcoIconColor='text-danger'
										// rating='3.1 (300+)'
								   	/>
			                     </div>
			                     <div className="item">
			                        <CardItem 
								   		title='Bite Me Sandwiches'
										subTitle='North Indian • American • Pure veg'
									  	imageAlt='Product'
									    image='img/list/3.png'
									    imageClass='img-fluid item-img'
									    linkUrl='detail'
									    offerText='65% off | Use Coupon OSAHAN50'
										time='15–25 min'
										price='$100 FOR TWO'
										// showPromoted={true}
										promotedVariant='dark'
										// favIcoIconColor='text-danger'
										// rating='3.1 (300+)'
								   	/>
			                     </div>
			                     <div className="item">
			                        <CardItem 
								   		title='The osahan Restaurant'
										subTitle='North Indian • American • Pure veg'
									  	imageAlt='Product'
									    image='img/list/6.png'
									    imageClass='img-fluid item-img'
									    linkUrl='detail'
									    offerText='65% off | Use Coupon OSAHAN50'
										time='20–25 min'
										price='$500 FOR TWO'
										// showPromoted={true}
										promotedVariant='danger'
										// favIcoIconColor='text-dark'
										// rating='3.1 (300+)'
								   	/>
			                     </div>
			                     <div className="item">
			                        <CardItem 
								   		title='Polo Lounge'
										subTitle='North Indian • American • Pure veg'
									  	imageAlt='Product'
									    image='img/list/9.png'
									    imageClass='img-fluid item-img'
									    linkUrl='detail'
									    offerText='65% off | Use Coupon OSAHAN50'
										time='20–25 min'
										price='$250 FOR TWO'
										// showPromoted={true}
										promotedVariant='dark'
										// favIcoIconColor='text-danger'
										// rating='3.1 (300+)'
								   	/>
			                     </div>
			                  </OwlCarousel>
			               </Col>
			            </Row>
			         </Container>
			    </section>
			    <section className="section pt-5 pb-5 bg-white becomemember-section border-bottom food-background" style={{marginTop:'-70px'}}>
			         <Container>
			         	<SectionHeading 
			         		heading='Join The Family'
			         		subHeading=''
			         	/>
			            <Row>
			               <Col sm={12} className="text-center">
			                  <Link to="/detail" className="btn btn-success btn-lg">
			                  	Check Menu <FontAwesome icon='chevron-circle-right' />
			                  </Link>
			               </Col>
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




export default Index;