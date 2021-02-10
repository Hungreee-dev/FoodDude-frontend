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
							<Col md={4} xs={12} style={{marginTop:'30px'}} >
								<blockquote class="blockquote blockquote-custom  p-5 shadow rounded" style={{background:'#f0f0f0',height:"300px"}} >
									<div class="blockquote-custom-icon bg-info shadow-sm"><i class="fa fa-quote-left text-white"></i></div>
									<h4 className="mb-2 font-weight-normal"><span className="font-weight-bold">Affordability</span></h4>
									<p class="mb-0 mt-2 font-italic">"The tastiest food doesn't have to be the costliest.
							  In these tough times, it may be very hard for us to spend every time we crave
							  something delicious. Fooddude promises to be the most affordable option you have to satisfy your hunger."</p>

								</blockquote>
							</Col>
							<Col md={4} xs={12} style={{marginTop:'30px'}}>
								<blockquote class="blockquote blockquote-custom  p-5 shadow rounded" style={{height:'300px',background:'#f0f0f0'}}>
									<div class="blockquote-custom-icon bg-info shadow-sm"><i class="fa fa-quote-left text-white"></i></div>
									<h4 className="mb-2 font-weight-normal"><span className="font-weight-bold">Quality</span></h4>
									<p class="mb-0 mt-2 font-italic">"Fooddude provides you the best food ranging from several
							cuisines from the best kitchens throughout the city. We assure you of satisfying your palette minus
							the food colours and unnecessary oil."</p>

								</blockquote>
							</Col>
							<Col md={4} xs={12} style={{marginTop:'30px'}}>
								<blockquote class="blockquote blockquote-custom  p-5 shadow rounded" style={{background:'#f0f0f0',height:"300px"}}>
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

			    <section className="section pt-5 pb-5 products-section food-background">
			         <Container>
			         	<SectionHeading 
			         		heading='Reviews From Experts'
			         		subHeading='The delectable, lucious, mouthwatering food you can find with us'
			         	/>
			            <Row>
			               <Col md={12}>
			                 <div class="osahan-slider">
			               	  <OwlCarousel autoplay nav loop {...options} className="owl-carousel-four owl-theme">
			                     <div className="item">
			                        <CardItem 
									  	imageAlt='Product'
									    image='img/bloggers/1.jpeg'
									    imageClass='img-fluid item-img'
									    linkUrl='#'
									    heading='@food_and_them_'
										content='@wefooddude is a Newly Opened Cloud Kitchen In Bhubaneswar Which is Serving Delicious Indian n Chinese Dishes at a Very Affordable Price and Delivering it at Your Doorstep Maintaining Utmost Safety and Sanitisation ♥️'
								   	/>
			                     </div>
								 <div className="item">
			                        <CardItem 
								   		
									  	imageAlt='Product'
									    image='img/bloggers/2.jpeg'
									    imageClass='img-fluid item-img'
									    linkUrl='#'
									    heading='-@foodishah'
										content='@wefooddude is an initiative borne out of a gaping hole of quality existing in the online food ordering space right now. Being founded by youngsters like us. It strives to cater to the palette of each and everyone.'
								   	/>
			                     </div>
								 <div className="item">
			                        <CardItem 
								   		
									  	imageAlt='Product'
									    image='img/bloggers/3.jpeg'
									    imageClass='img-fluid item-img'
									    linkUrl='#'
									    heading='@thatfoodieartist'
										content='Food Dude is an initiative borne out of a gaping hole of quality existing in the online food ordering space right now. Being founded by youngsters like ourselves, it strives to cater to the palette of everyone.'
								   	/>
			                     </div>
								 <div className="item mr-2">
			                        <CardItem 
								   		
									  	imageAlt='Product'
									    image='img/bloggers/4.jpeg'
									    imageClass='img-fluid item-img'
									    linkUrl='#'
									    heading='@hungrie_young_man'
										content='Cloud kitchen alert. FoodDude is the new addition to the list of Cloud kitchens in Bhubaneswar. The food delivered was well packed with paper handkerchief, spoons, sanitiser and ketchup.'
								   	/>
			                     </div>
								 <div className="item">
			                        <CardItem 
								   		
									  	imageAlt='Product'
									    image='img/bloggers/5.jpeg'
									    imageClass='img-fluid item-img'
									    linkUrl='#'
									    heading='@jas_tronomy'
										content='NEW CLOUD KITCHEN ALERT.  It was packed with all needed amenities and the food delivered was amazing as there was no compromise in quality and quantity.'
								   	/>
			                     </div>
			                  </OwlCarousel>
							  </div>
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