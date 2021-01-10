import React,{useRef,useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {Row,Col,Container,Form,Button,Alert} from 'react-bootstrap';
import {useAuth} from '../contexts/AuthContext';
import FontAwesome from './common/FontAwesome';
import { auth,googleProvider} from '../firebase'
import axios from 'axios'

function Register(props) {
const nameRef=useRef();
const phoneRef=useRef();
const emailRef = useRef();
const passwordRef = useRef();
const passwordConfirmRef = useRef();
const {signup,currentUser,setCurrentUser}=useAuth();
const [error, setError] = useState("")
const [loading, setLoading] = useState(false)
const history = useHistory()





async function handleSubmit(e) {
    e.preventDefault()
    //const UserDetails={ }
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
	 const result=  await signup(emailRef.current.value, passwordRef.current.value)
	 const token = await result.user.getIdToken()
	 const res=await fetch(`http://localhost:3030/api/users/new`,{
        method:"post",
        headers:{'Content-Type':"application/json",Authorization:token},
        body:JSON.stringify({
			name:nameRef.current.value,
			phone:phoneRef.current.value,
			email:result.user.email,
			uid:result.user.uid
      }) 
    }) 
	if(res){
		history.push("/myaccount")
		const userData={name:nameRef.current.value,phone:phoneRef.current.value,email:result.user.email,uid:result.user.uid,token:token}
		 localStorage.setItem('userData',JSON.stringify(userData))
	}
	 
    } catch(err) {
		console.log(err)
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  const signInWithGoogle = () => {
	auth.signInWithPopup(googleProvider).then((res) => {
	  setCurrentUser(res.user)
	  res.user.getIdToken().then(token=>{
		axios.post(`http://localhost:3030/api/users/new`,{
		name:res.user.displayName,
			  phone:res.user.phoneNumber,
			  email:res.user.email,
			  uid:res.user.uid
	  },{
		headers:{Authorization:token}
	  }).catch(err=>console.log(err))
	  const userData={name:res.user.displayName,phone:res.user.phoneNumber,email:res.user.email,uid:res.user.uid,token:token}
	 localStorage.setItem('userData',JSON.stringify(userData))  
	} )
	  history.push('/')
	}).catch((error) => {
	  console.log(error.message)
	})
  }



    	return (
    	  <Container fluid className='bg-white'>
	         <Row>
	            <Col md={4} lg={6} className="d-none d-md-flex bg-image"><div>{currentUser && currentUser.email}</div></Col>
	            <Col md={8} lg={6}>
	               <div className="login d-flex align-items-center py-5">
	                  <Container>
	                     <Row>
	                        <Col md={9} lg={8} className="mx-auto pl-5 pr-5">
	                           <h3 className="login-heading mb-4"><img class="mr-3" src="/img/logo-fd-round.png" alt="logo"></img>New Buddy!</h3>
							   {error && <Alert variant="danger">{error}</Alert>}
	                           <Form onSubmit={handleSubmit}> 
							      <div className="form-label-group">
	                                 <Form.Control type="text" id="inputName" placeholder="Name" ref={nameRef} />
	                                 <Form.Label htmlFor="inputName">Name </Form.Label>
	                              </div>
								  <div className="form-label-group">
	                                 <Form.Control type="text" id="inputPhone" placeholder="Phone No." ref={phoneRef} />
	                                 <Form.Label htmlFor="inputPhone">Phone No. </Form.Label>
	                              </div>
								  <div className="form-label-group">
	                                 <Form.Control type="email" id="inputEmail" placeholder="Email address" ref={emailRef} />
	                                 <Form.Label htmlFor="inputEmail">Email address </Form.Label>
	                              </div>
	                              <div className="form-label-group">
	                                 <Form.Control type="password" id="inputPassword" placeholder="Password" ref={passwordRef} />
	                                 <Form.Label htmlFor="inputPassword">Password</Form.Label>
	                              </div>
	                              <div className="form-label-group">
	                                 <Form.Control type="password" id="inputPassword2" placeholder="Confirm Password" ref={passwordConfirmRef} />
	                                 <Form.Label htmlFor="inputPassword2"> Confirm Password</Form.Label>
	                              </div>
	                              <Button type="submit" disabled={loading} className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2">Sign Up</Button>
	                              <div className="text-center pt-3">
	                                 Already have an account? <Link className="font-weight-bold" to="/login">Sign In</Link>
	                              </div>
								  <hr className="my-4" />
		                           <p className="text-center">SIGN UP WITH</p>
								   <div className="row">
		                              <div className="col pr-2">
		                                 <Button className="btn pl-1 pr-1 btn-lg btn-google font-weight-normal text-white btn-block text-uppercase" onClick={signInWithGoogle}><FontAwesome icon="google" className="mr-2" /> Google</Button>
		                              </div>
									  </div>
	                           </Form>
	                        </Col>
	                     </Row>
	                  </Container>
	               </div>
	            </Col>
	         </Row>
	      </Container>
    	);
    }



export default Register;