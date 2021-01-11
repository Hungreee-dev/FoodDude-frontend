import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import {Button} from 'react-bootstrap';
import Icofont from 'react-icofont';

function CheckoutItem(props){
  const [quantity,setQuantity]=React.useState(props.qty)
  const max = props.maxValue || 5
  const min = props.minValue || 0
  const [show,setShow] = React.useState(props.show || true)
  const price = props.price
   
  
   const IncrementItem = () => {
      if(quantity >= max) {
  
      }else {
          // setQuantity(quantity+1)
        props.getValue({id:props.id,quantity: (quantity + 1 ),price:price});
      }
    }
   const DecreaseItem = () => {
      if(quantity <= (min)) {
  
      }else {
        // setQuantity(quantity-1)
        props.getValue({id:props.id,quantity: (quantity - 1 ),price:price});
      }
    }
  
 const ToggleClick = () => {
    setShow(!show)
  }

  React.useEffect(()=>{
 setQuantity(props.qty)
  })
  

    return (
    	<div className="gold-members p-2 border-bottom">
           <p className="text-gray mb-0 float-right ml-2">{props.priceUnit}{props.price * quantity}</p>
           <span className="count-number float-right">
               <Button variant="outline-secondary" onClick={DecreaseItem} className="btn-sm left dec"> <Icofont icon="minus" /> </Button>
               <input className="count-number-input" type="number" value={quantity} readOnly/>
               <Button variant="outline-secondary" onClick={IncrementItem} className="btn-sm right inc"> <Icofont icon="icofont-plus" /> </Button>
           </span>
           <div className="media">
              <div className="mr-2"><Icofont icon="ui-press" className="text-danger food-item" /></div>
              <div className="media-body">
                 <p className="mt-1 mb-0 text-black">{props.itemName}</p>
              </div>
           </div>
        </div>
    );
  }


CheckoutItem.propTypes = {
  itemName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  priceUnit: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  qty: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  getValue: PropTypes.func.isRequired
};
CheckoutItem.defaultProps = {
  show: true,
  priceUnit:'$'
}



export default CheckoutItem;