import React from 'react';
import PropTypes from 'prop-types'; 
import {Link} from 'react-router-dom';
import {Row,Col,Container,Form,InputGroup,FormControl,Button,Image} from 'react-bootstrap';
import FontAwesome from './FontAwesome';

function Footer(props) {

	
    	return (
    		<>
			    
			    <section className="footer pt-5 pb-3" >
			         <Container>
			            <Row>
			               <Col md={4} sm={12}>
			                  
			                  <div className="app">
			                     <p className="mb-2">DOWNLOAD OUR APP</p>
			                     <Link to="#">
			                     	<Image src="img/google.png" alt='' fluid />
			                     </Link>
			                     <Link to="#">
			                     	<Image src="img/apple.png" alt='' fluid />
			                     </Link>
			                  </div>
			               </Col>
			               
			               <Col md={3} sm={6} xs={6}>
			                  <h6 className="mb-3">About Food Dude</h6>
			                  <ul>
			                     <li><Link to="#">About Us</Link></li>
			                     <li><Link to="#">Culture</Link></li>
			                     <li><Link to="#">Blog</Link></li>
			                     <li><Link to="#">Careers</Link></li>
			                     <li><Link to="#">Contact</Link></li>
			                  </ul>
			               </Col>
			               <Col md={3} sm={6} xs={6}>
			                  <h6 className="mb-3">For Foodies</h6>
			                  <ul>
			                     <li><Link to="#">Community</Link></li>
			                     <li><Link to="#">Developers</Link></li>
			                     <li><Link to="#">Blogger Help</Link></li>
			                     <li><Link to="#">Verified Users</Link></li>
			                     <li><Link to="#">Code of Conduct</Link></li>
			                  </ul>
			               </Col>
			              
			            </Row>
			         </Container>
			    </section>
		    </>
    	);
    }



Footer.propTypes = {
  sectionclassName: PropTypes.string,
  popularCHclassName:PropTypes.string,
  popularCountries: PropTypes.array,
  popularFHclassName:PropTypes.string,
  popularFood: PropTypes.array,
  copyrightText: PropTypes.string,
  madewithIconclassName: PropTypes.string,
  firstLinkText: PropTypes.string,
  firstLink: PropTypes.string,
  secondLinkText: PropTypes.string,
  secondLink: PropTypes.string,
};

Footer.defaultProps = {
    sectionclassName: 'footer-bottom-search pt-5 pb-5 bg-white',
	popularCHclassName:'text-black',
	popularCountries: [],
	popularFHclassName:'mt-4 text-black',
	popularFood: [],
	copyrightText: '© Copyright 2020 Osahan Eat. All Rights Reserved',
	madewithIconclassName: 'heart heart-icon text-danger',
	firstLinkText: 'Gurdeep Osahan',
	firstLink: "//www.instagram.com/iamgurdeeposahan/",
	secondLinkText: 'Askbootstrap',
	secondLink: '//askbootstrap.com/',
}



export default Footer;