import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Media, Button } from 'react-bootstrap';
import Icofont from 'react-icofont';
import PropTypes from 'prop-types';

function ChooseAddressCard(props) {
    const [focus, setFocus] = React.useState(false);
    return (
        <Card className={' addresses-item mb-4 ' + props.boxclassName} style={{ background: focus && '#cdffba' }}>
            <div className="gold-members p-4" style={{ width: '100%' }}>
                <Media>
                    <div className="mr-3">
                        <Icofont icon={props.icoIcon} className={props.iconclassName} />
                    </div>
                    <div className="media-body">
                        <h6 className="mb-1 text-secondary">{props.title}</h6>
                        <p className="text-black">{props.address}</p>
                    </div>
                </Media>
            </div>
        </Card>
    );
}

ChooseAddressCard.propTypes = {
    title: PropTypes.string.isRequired,
    icoIcon: PropTypes.string.isRequired,
    iconclassName: PropTypes.string,
    address: PropTypes.string,
    onDeliverHere: PropTypes.func,
    onAddNewClick: PropTypes.func,
    type: PropTypes.string.isRequired,
};

ChooseAddressCard.defaultProps = {
    type: 'hasAddress',
};

export default ChooseAddressCard;
