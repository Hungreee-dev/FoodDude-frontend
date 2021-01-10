import React from 'react';
import axios from 'axios'
import {Row,Col,Button} from 'react-bootstrap';
import AddAddressModal from '../modals/AddAddressModal';
import DeleteAddressModal from '../modals/DeleteAddressModal';
import EditAddressModal from '../modals/EditAddressModal'
import AddressCard from '../common/AddressCard';

function Addresses() {
	const [addressModal,showAddressModal]=React.useState(false)
	const [editModal,showEditModal]=React.useState(false)
	const [deleteModal,showDeleteModal]=React.useState(false)
    const [AddressData, setAddressData] = React.useState([]);
    const [recievedData, setRecievedData] = React.useState(false)
    const {uid,token} = JSON.parse(localStorage.getItem("userData"))
    const [addressId,setAddressId]=React.useState('')
    const [updated,isUpdated]=React.useState()
  
	
	React.useEffect(()=>{
	  try{
		  console.log(uid)
	  const fetchData= async ()=>{
		const result= await axios.post(`http://localhost:3030/api/users/address/get-all`,{
			uid:uid
		},{
			headers:{Authorization:token}
		}) ;
		
		if(result.data){
			console.log(result.data)
		  setAddressData(result.data)
		  setRecievedData(true)
		}
	  
		else {
		 console.log("error")
		} 
	}
	  fetchData();
	  
	}catch(err){
		console.log(err);
	  }
	
	},[updated]);
	
	const  hideDeleteModal = () => showDeleteModal(false);
	const  hideAddressModal = () => showAddressModal(false);
	const  hideEditModal = () => showEditModal(false);

	return (
	      <>
			<EditAddressModal show={editModal} onHide={hideEditModal} isUpdated={isUpdated} addressId={addressId}/>
	        <AddAddressModal show={addressModal} onHide={hideAddressModal} isUpdated={isUpdated} />
	        <DeleteAddressModal show={deleteModal} onHide={hideDeleteModal} isUpdated={isUpdated} addressId={addressId}/>
		    <div className='p-4 bg-white shadow-sm'>
              <Row>
               <Col md={12}>
                  <h4 className="font-weight-bold mt-0 mb-3">Manage Addresses</h4>
               </Col>
               
			   {AddressData.map(item=>{
				   return(
					   <Col md={6}>
						   <AddressCard
							   boxClass="border border-primary shadow"
							   title='Home'
							   icoIcon='ui-home'
							   iconclassName='icofont-3x'
							   address={`${item.housenumber}, ${item.line1}, ${item.line2}, ${item.city},${item.state} ${item.pincode}, India`}
							   onEditClick={() => {
								setAddressId(item.id)  
								showEditModal(true)
								  
								}}
							   onDeleteClick={() => {
								setAddressId(item.id)   
								showDeleteModal(true)
								}}
						   />
					   </Col>
				   )
			   })}

						<Col md={12}>
							<div style={{display:'flex',justifyContent:'center'}}> 
							<Button type='button' onClick={()=>{showAddressModal(true)}} variant="primary" className='d-flex w-50 text-center justify-content-center'>Add Address</Button>
							</div>
						</Col>
               {/* <Col md={6}>
               	  <AddressCard 
               	  	  boxClass="shadow-sm"
					  title= 'Work'
					  icoIcon= 'briefcase'
					  iconclassName= 'icofont-3x'
					  address= 'NCC, Model Town Rd, Pritm Nagar, Model Town, Ludhiana, Punjab 141002, India'
					  onEditClick= {() => showAddressModal(true)}
					  onDeleteClick={() =>  showDeleteModal(true)}
               	  />
               </Col>
               <Col md={6}>
               	  <AddressCard 
               	  	  boxClass="shadow-sm"
					  title= 'Other'
					  icoIcon= 'location-pin'
					  iconclassName= 'icofont-3x'
					  address= 'Delhi Bypass Rd, Jawaddi Taksal, Ludhiana, Punjab 141002, India'
					  onEditClick= {() => showAddressModal(true)}
					  onDeleteClick={() =>  showDeleteModal(true)}
               	  />
               </Col>
               <Col md={6}>
               	  <AddressCard 
               	  	  boxClass="shadow-sm"
					  title= 'Other'
					  icoIcon= 'location-pin'
					  iconclassName= 'icofont-3x'
					  address= 'MT, Model Town Rd, Pritm Nagar, Model Town, Ludhiana, Punjab 141002, India'
					  onEditClick= {() => showAddressModal(true)}
					  onDeleteClick={() =>  showDeleteModal(true)}
               	  />
               </Col>
               <Col md={6}>
               	  <AddressCard 
               	  	  boxClass="shadow-sm"
					  title= 'Other'
					  icoIcon= 'location-pin'
					  iconclassName= 'icofont-3x'
					  address= 'GNE Rd, Jawaddi Taksal, Ludhiana, Punjab 141002, India'
					  onEditClick= {() => showAddressModal(true)}
					  onDeleteClick={() =>  showDeleteModal(true)}
               	  />
               </Col>
               <Col md={6}>
               	  <AddressCard 
               	  	  boxClass="shadow-sm"
					  title= 'Other'
					  icoIcon= 'location-pin'
					  iconclassName= 'icofont-3x'
					  address= 'GTTT, Model Town Rd, Pritm Nagar, Model Town, Ludhiana, Punjab 141002, India'
					  onEditClick= {() => showAddressModal(true)}
					  onDeleteClick={() =>  showDeleteModal(true)}
               	  />
               </Col> */}
              </Row>
		    </div>
	      </>
    	);
    }

export default Addresses;