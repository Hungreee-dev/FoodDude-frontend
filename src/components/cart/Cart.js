import React from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';
import {NavDropdown} from 'react-bootstrap';
import DropDownTitle from '../common/DropDownTitle';
import CartDropdownHeader from '../cart/CartDropdownHeader';
import CartDropdownItem from '../cart/CartDropdownItem';
import {useAuth} from '../../contexts/AuthContext';
import {BaseUrl2} from '../../BaseUrl'
export default function Cart(props){
    const userData=JSON.parse(localStorage.getItem('userData'))
  const [cartData,setCartData]=React.useState([])
  const {cartUpdated} = useAuth();
  const [totalPrice,setTotalPrice]=React.useState(0)
  React.useEffect(()=>{
	try{
   if(userData)	{	
       console.log('ohnnooo')
       setTotalPrice(0)
	const fetchData= async ()=>{
	  const result= await axios.post(`${BaseUrl2}/api/users/cart/get`,{
		  uid:userData.uid
	  },{
		  headers:{Authorization:userData.token}
	  }) ;
	  
	  if(result.data){
		
          setCartData(result.data)
         for(let item of result.data){
             console.log(item.quantity*item.price)
             setTotalPrice(price=>{return Number(price+item.quantity*item.price)})
         } 
         
         
		 //setRecievedData(true)
	  }
	
	  else {
	   console.log("error")
	  } 
  }
	fetchData();
	}
  }catch(err){
	  console.log(err);
	}
  },[props.cartUpdated]);

 return(
    <NavDropdown activeclassname="active" alignRight className="dropdown-cart" 
    title={
        <DropDownTitle 
            className='d-inline-block' 
            faIcon='shopping-basket'
            iconClass='mr-1'
            title='Cart'
            badgeClass='ml-1'
            badgeVariant='success'
            badgeValue={cartData && cartData.length}
        />
    }
>

    <div className="dropdown-cart-top shadow-sm">
         {
             <CartDropdownHeader 
                 className="dropdown-cart-top-header p-4" 
                 title="Your Cart"
                 subTitle="Remember!! Belly rules the mind :)"
                 NavLinkUrl="/detail"
                 NavLinkText="View Full Menu"
             
           />
         } 
      <div className="dropdown-cart-top-body border-top p-4">

         {
             cartData.map(item=>{
                return (
                    <CartDropdownItem 
                    icoIcon='ui-press'
                    iconClass='text-success food-item'
                    title={`${item.name} x ${item.quantity}`}
                    price={`₹${item.quantity*item.price}`}
                />
                )
            })
         }
        

         {/* <CartDropdownItem 
             icoIcon='ui-press'
             iconClass='text-danger food-item'
             title='Chicken Tikka Sub 12" (30 cm) x 1'
             price='$314'
         />

         <CartDropdownItem 
             icoIcon='ui-press'
             iconClass='text-success food-item'
             title='Corn & Peas Salad x 1 '
             price='$209'
         /> */}
      </div>
      <div className="dropdown-cart-top-footer border-top p-4">
         <p className="mb-0 font-weight-bold text-secondary">Sub Total <span className="float-right text-dark">{totalPrice}</span></p>
         <small className="text-info">Extra charges may apply</small>  
      </div>
      <div className="dropdown-cart-top-footer border-top p-2">
         <NavDropdown.Item eventKey={5.1} as={Link} className="btn btn-success btn-block py-3 text-white text-center dropdown-item" to="/checkout"> Checkout</NavDropdown.Item>
      </div>
    </div>
</NavDropdown>
 )


}