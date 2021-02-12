import React,{useRef,useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';
import {Row,Col,Container,Form,Button,Alert} from 'react-bootstrap';
import FontAwesome from './common/FontAwesome';
import { auth,googleProvider} from '../firebase'
import axios from 'axios'
import {BaseUrl} from '../BaseUrl'


const  asyncLocalStorage = {
     setItem: async function (key, value) {
        return Promise.resolve().then(function () {
            localStorage.setItem(key, value);
        });
    },
    getItem: async function (key) {
        return Promise.resolve().then(function () {
            return localStorage.getItem(key);
        });
    }
};







function Login (props) {
	const emailRef = useRef()
	const passwordRef = useRef()
	const { login,setCurrentUser,updateCart} = useAuth()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const history = useHistory()

	async function handleSubmit(e) {
	  e.preventDefault()

	  try {
		setError("")
		setLoading(true)
		const result = await login(emailRef.current.value, passwordRef.current.value)
		const token = await result.user.getIdToken()
		// console.log(token)
        const res= await axios.post(`${BaseUrl}/api/user/getDetails`,{
			uid:result.user.uid
		},{
			headers:{Authorization:token}
		})
		const userData={name:res.data.name,phone:res.data.phone,email:emailRef.current.value,uid:result.user.uid,token:token}
		await asyncLocalStorage.setItem('userData',JSON.stringify(userData))
		history.push('/')
		updateCart()
	  } catch {
		setError("Failed to log in")
	  }

	  setLoading(false)
	}


	const signInWithGoogle = () => {
		auth.signInWithPopup(googleProvider).then((res) => {
		  setCurrentUser(res.user)
		  res.user.getIdToken().then(token=>{
		  const userData={name:res.user.displayName,phone:res.user.phoneNumber,email:res.user.email,uid:res.user.uid,token:token}
		  asyncLocalStorage.setItem('userData',JSON.stringify(userData))
		})
		updateCart()
		  history.push('/')
		}).catch((error) => {
		  console.log(error.message)
		})
	  }
    	return (
    	  <Container fluid className='bg-white'>
	         <Row>
	            <Col md={4} lg={6} className="d-none d-md-flex bg-image"><img src='https://images.unsplash.com/photo-1502301103665-0b95cc738daf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80' height='700px' width="800px"/></Col>
	            <Col md={8} lg={6}>
	               <div className="login d-flex align-items-center py-5">
	                  <Container>
	                     <Row>
	                        <Col md={9} lg={8} className="mx-auto pl-5 pr-5">
	                           <h3 className="login-heading mb-4"><img class="mr-3" src="/img/logo-fd-round.png" alt="logo"></img>Welcome back!</h3>
	                           {error && <Alert variant="danger">{error}</Alert>}
							   <Form onSubmit={handleSubmit}>
	                              <div className="form-label-group">
	                                 <Form.Control type="email" id="inputEmail" placeholder="Email address" ref={emailRef} />
	                                 <Form.Label htmlFor="inputEmail">Email address</Form.Label>
	                              </div>
	                              <div className="form-label-group">
	                                 <Form.Control type="password" id="inputPassword" placeholder="Password" ref={passwordRef} />
	                                 <Form.Label htmlFor="inputPassword">Password</Form.Label>
	                              </div>

	                              <Button type="submit" disabled={loading} className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2" style={{marginTop:'30px'}}>Sign in</Button>
	                              <div className="text-center pt-3">
	                                 Don’t have an account? <Link className="font-weight-bold" to="/register">Sign Up</Link>
	                              </div>
		                           <hr className="my-4" />
		                           <p className="text-center">LOGIN WITH</p>
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



export default Login;
