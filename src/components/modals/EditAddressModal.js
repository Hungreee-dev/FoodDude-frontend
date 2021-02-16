import React from 'react';
import { Form, InputGroup, Modal, ButtonToolbar, Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

export default function EditAddressModal(props) {
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
            housenumber: housenoRef.current.value,
            line1: line1Ref.current.value,
            line2: line2Ref.current.value,
            city: cityRef.current.value,
            state: stateRef.current.value,
            pincode: pincodeRef.current.value,
        };

        try {
            const res = await fetch(`http://localhost:3030/api/users/address/edit`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json', Authorization: token },
                body: JSON.stringify({
                    address: address,
                    uid: uid,
                    addressId: props.addressId,
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
                    Edit Address
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
                                <Form.Control type="text" readonly placeholder="City" ref={cityRef} />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="col-md-12">
                            <Form.Label>State</Form.Label>
                            <InputGroup>
                                <Form.Control type="text" readonly placeholder="State" ref={stateRef} />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="col-md-12">
                            <Form.Label>Pincode</Form.Label>
                            <InputGroup>
                                <Form.Control type="number" placeholder="Pincode" ref={pincodeRef} />
                            </InputGroup>
                        </Form.Group>
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
