import React from 'react';
import PropTypes from 'prop-types'; 

class SectionHeading extends React.Component {
	render() {
    	return (
            <div  className={`section-header ${this.props.alignClass}`}>
               <h1 style={{background:'white'}} style={{fontWeight:'700'}}>{this.props.heading}</h1>
               {this.props.subHeading ? (
               		<p>{this.props.subHeading}</p>
               		):''
               }
               <span className="line"></span>
            </div>
		);
	}
}


SectionHeading.propTypes = {
  heading: PropTypes.string.isRequired,
  subHeading: PropTypes.string,
  alignClass: PropTypes.string,
};
SectionHeading.defaultProps = {
  subHeading: '',
  alignClass: 'text-center',
}

export default SectionHeading;