import React from 'react';
import { Form, InputGroup, Modal, ButtonToolbar, Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { BaseUrl2 } from '../../BaseUrl';

export default function AddAddressModal(props) {
    const housenoRef = React.useRef();
    const line1Ref = React.useRef();
    const line2Ref = React.useRef();
    const cityRef = React.useRef();
    const stateRef = React.useRef();
    const pincodeRef = React.useRef();

    const { token, uid } = JSON.parse(localStorage.getItem('userData'));
    const handleSubmit = async (e) => {
        e.preventDefault();
        const address = {
            houseNumber: housenoRef.current.value,
            line1: line1Ref.current.value,
            line2: line2Ref.current.value,
            city: cityRef.current.value,
            state: stateRef.current.value,
            pincode: pincodeRef.current.value,
        };

        try {
            const res = await fetch(`${BaseUrl2}/api/users/address/add`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json', Authorization: token },
                body: JSON.stringify({
                    address: address,
                    uid: uid,
                }),
            });
            if (res) {
                props.isUpdated(Math.random());
                props.onHide();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Modal show={props.show} onHide={props.onHide} centered>
            <Modal.Header closeButton={true}>
                <Modal.Title as="h5" id="add-address">
                    Add Delivery Address
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <Form.Group className="col-md-12">
                            <Form.Label>House No.</Form.Label>
                            <InputGroup>
                                <Form.Control type="text" placeholder="House no." ref={housenoRef} />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="col-md-12">
                            <Form.Label>Address Line 1</Form.Label>
                            <InputGroup>
                                <Form.Control type="text" placeholder="Line 1" ref={line1Ref} />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="col-md-12">
                            <Form.Label>Address Line 2</Form.Label>
                            <InputGroup>
                                <Form.Control type="text" placeholder="Line 2" ref={line2Ref} />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="col-md-12">
                            <Form.Label>City</Form.Label>
                            <InputGroup>
                                <Form.Control type="text" readOnly value="Bhubaneswar" ref={cityRef} />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="col-md-12">
                            <Form.Label>State</Form.Label>
                            <InputGroup>
                                <Form.Control type="text" readOnly value="Orisha" ref={stateRef} />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="col-md-12">
                            <Form.Label>Pincode</Form.Label>
                            <InputGroup>
                                <Form.Control type="number" placeholder="Pincode" ref={pincodeRef} />
                            </InputGroup>
                        </Form.Group>

                        {/* <Form.Group className="mb-0 col-md-12">
                   <Form.Label>Nickname</Form.Label>
                   <ButtonToolbar>
                      <ToggleButtonGroup className="d-flex w-100" type="radio" name="options" defaultValue={1}>
    							    <ToggleButton variant='info' value={1}>
    							      Home
    							    </ToggleButton>
    							    <ToggleButton variant='info' value={2}>
    							      Work
    							    </ToggleButton>
    							    <ToggleButton variant='info' value={3}>
    							      Other
    							    </ToggleButton>
        					    </ToggleButtonGroup>
    						  </ButtonToolbar>
                </Form.Group> */}
                    </div>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    type="button"
                    onClick={props.onHide}
                    variant="primary"
                    className="d-flex w-50 text-center justify-content-center"
                >
                    Cancel
                </Button>
                <Button
                    type="button"
                    onClick={handleSubmit}
                    variant="primary"
                    className="d-flex w-50 text-center justify-content-center"
                >
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
