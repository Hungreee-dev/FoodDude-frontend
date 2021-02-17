import React from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';
import AddAddressModal from '../modals/AddAddressModal';
import DeleteAddressModal from '../modals/DeleteAddressModal';
import EditAddressModal from '../modals/EditAddressModal';
import AddressCard from '../common/AddressCard';
import { BaseUrl2 } from '../../BaseUrl';
function Addresses() {
    const [addressModal, showAddressModal] = React.useState(false);
    const [editModal, showEditModal] = React.useState(false);
    const [deleteModal, showDeleteModal] = React.useState(false);
    const [AddressData, setAddressData] = React.useState([]);
    const [recievedData, setRecievedData] = React.useState(false);
    const { uid, token } = JSON.parse(localStorage.getItem('userData'));
    const [addressId, setAddressId] = React.useState('');
    const [updated, isUpdated] = React.useState();

    React.useEffect(() => {
        try {
            console.log(uid);
            const fetchData = async () => {
                const result = await axios.post(
                    `${BaseUrl2}/api/users/address/get-all`,
                    {
                        uid: uid,
                    },
                    {
                        headers: { Authorization: token },
                    }
                );

                if (result.data) {
                    console.log(result.data);
                    setAddressData(result.data);
                    setRecievedData(true);
                } else {
                    console.log('error');
                }
            };
            fetchData();
        } catch (err) {
            console.log(err);
        }
    }, [updated]);

    const hideDeleteModal = () => showDeleteModal(false);
    const hideAddressModal = () => showAddressModal(false);
    const hideEditModal = () => showEditModal(false);

    return (
        <>
            <EditAddressModal show={editModal} onHide={hideEditModal} isUpdated={isUpdated} addressId={addressId} />
            <AddAddressModal show={addressModal} onHide={hideAddressModal} isUpdated={isUpdated} />
            <DeleteAddressModal
                show={deleteModal}
                onHide={hideDeleteModal}
                isUpdated={isUpdated}
                addressId={addressId}
            />
            <div className="p-4 bg-white  food-background">
                <Row>
                    <Col md={12}>
                        <h4 className="font-weight-bold mt-0 mb-3 text-center">Manage Addresses</h4>
                    </Col>
                    <Col className="col-md-6" style={{ margin: 'auto' }}>
                        {AddressData.map((item) => {
                            return (
                                <Row>
                                    <AddressCard
                                        boxClass="border border-primary shadow"
                                        title="Home"
                                        icoIcon="ui-home"
                                        iconclassName="icofont-3x"
                                        address={`${item.houseNumber}, ${item.line1}, ${item.line2}, ${item.city},${item.state} ${item.pincode}, India`}
                                        onEditClick={() => {
                                            setAddressId(item.id);
                                            showEditModal(true);
                                        }}
                                        onDeleteClick={() => {
                                            setAddressId(item.id);
                                            showDeleteModal(true);
                                        }}
                                    />
                                </Row>
                            );
                        })}
                    </Col>

                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                type="button"
                                onClick={() => {
                                    showAddressModal(true);
                                }}
                                variant="primary"
                                className="d-flex w-50 text-center justify-content-center"
                            >
                                Add Address
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Addresses;
