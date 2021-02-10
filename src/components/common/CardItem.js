import React from 'react';
import {Link} from 'react-router-dom';
import {Image,Badge} from 'react-bootstrap';
import PropTypes from 'prop-types'; 
import Icofont from 'react-icofont';

class CardItem extends React.Component {
	render() {
    	return (
    		<div>
               <div className="list-card-image shadow">
               	  {/* {this.props.rating ? (
	                  <div className="star position-absolute">
                  		<Badge variant="success">
	                  		<Icofont icon='star'/> {this.props.rating}
	                  	</Badge>
	              	  </div>
	              	  )
	              	  :""
	              } */}
                  {/* <div className={`favourite-heart position-absolute ${this.props.favIcoIconColor}`}>
                  	<Link to={this.props.linkUrl}>
                  		<Icofont icon='heart'/>
                  	</Link>
                  </div> */}
                  {/* {this.props.showPromoted ? (
	                  <div className="member-plan position-absolute">
	                  	<Badge variant={this.props.promotedVariant}>Promoted</Badge>
	                  </div>
	                  )
                  	  :""
                  } */}
                  <Link to={this.props.linkUrl}>
                  	<Image src={this.props.image} className={this.props.imageClass} alt={this.props.imageAlt} style={{height:'250px'}} />
                  </Link>
               </div>
               <blockquote class="blockquote blockquote-custom p-3 shadow rounded" style={{background:'#f0f0f0',height:"300px"}}>
									<div class="blockquote-custom-icon bg-info shadow-sm"><i class="fa fa-quote-left text-white"></i></div>
									<p class="mb-0 mt-3 font-italic">"{this.props.content}"</p>
									<p className="mb-2 font-italic" style={{color:'black',fontSize:'12px',textAlign:'right'}}><b>By-{this.props.heading}</b></p>

								</blockquote>
            </div>
		);
	}
}


CardItem.propTypes = {
  title: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  image: PropTypes.string.isRequired,
  imageClass: PropTypes.string,
  linkUrl: PropTypes.string.isRequired,
  offerText: PropTypes.string,
  offerColor: PropTypes.string,
  subTitle: PropTypes.string,
  time: PropTypes.string,
  price: PropTypes.string,
  showPromoted: PropTypes.bool,
  promotedVariant: PropTypes.string,
  favIcoIconColor: PropTypes.string,
  rating: PropTypes.string,
};
CardItem.defaultProps = {
  	imageAlt:'',
    imageClass:'',
    offerText: '',
    offerColor: 'success',
	subTitle: '',
	time: '',
	price: '',
	showPromoted: false,
  	promotedVariant: 'dark',
	favIcoIconColor: '',
	rating: '',
}

export default CardItem;