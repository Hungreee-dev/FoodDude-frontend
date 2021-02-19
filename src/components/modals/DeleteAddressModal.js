import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import {BaseUrl2} from '../../BaseUrl'
function DeleteAddressModal(props) {

const {token,uid}=JSON.parse(localStorage.getItem('userData'))

	const handleSubmit=async (e)=>{
		e.preventDefault()
	
		try {	
		 const res=await fetch(`${BaseUrl2}/api/users/address/remove`,{
			method:"post",
			headers:{'Content-Type':"application/json",Authorization:token},
			body:JSON.stringify({
				uid:uid,
				addressId:props.addressId
		  }) 
		}) 
		if(res){
			props.isUpdated(Math.random())
			props.onHide()
		}
		} catch(err) {
			console.log(err)
		}
	}
	
    	return (
	        <Modal 
	        	show={props.show} 
	        	onHide={props.onHide}
		        centered
		        size="sm"
		   	  >
			  <Modal.Header closeButton={true}>
			    <Modal.Title as='h5' id="delete-address">Delete Address</Modal.Title>
			  </Modal.Header>

			  <Modal.Body>
  				<p className="mb-0 text-black">Are you sure you want to delete this Address?</p>   
			  </Modal.Body>

			  <Modal.Footer>
			    <Button type='button' onClick={props.onHide} variant="primary" className="d-flex w-50 text-center justify-content-center">CANCEL</Button>
			    <Button type='button' onClick={handleSubmit} variant="primary" className='d-flex w-50 text-center justify-content-center'>DELETE</Button>
			  </Modal.Footer>
			</Modal>
    	);
    }

export default DeleteAddressModal;