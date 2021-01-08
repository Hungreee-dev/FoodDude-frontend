import React from 'react';
import {Modal,Button,Row,Col,Container} from 'react-bootstrap';
import {useAuth} from '../../contexts/AuthContext'
import {useHistory} from 'react-router-dom'




export default function SignOutModal(props) {
const {logout} = useAuth();
const history= useHistory(); 
const [error, setError] = React.useState("")

async function handleLogout() {
    setError("")
    try {
      await logout()
      props.onHide()
      history.push("/")
    } catch {
      setError("Failed to log out")
    }
  }
return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            centered
            size="md"
        >
            <Modal.Header closeButton={true}>
                <Modal.Title as='h5' id="delete-address">Sign Out</Modal.Title>
                {error}
            </Modal.Header>

            <Modal.Body>
                <p className="mb-0 text-black">Are you sure you want to Sign out ?</p>
            </Modal.Body>

            <Modal.Footer>
                <Container>
                    <Row>
                        <Col xs={12} md={5}>
                            <Button onClick={handleLogout} type='button' variant="primary" className='d-flex w-50 text-center justify-content-center'>Yes</Button>
                        </Col>
                        <Col xs={12} md={5}>
                            <Button type='button' onClick={props.onHide} variant="primary" className="d-flex w-50 text-center justify-content-center">Cancel</Button>
                        </Col>
                    </Row>
                </Container>         
            </Modal.Footer>
        </Modal>
    );
}

