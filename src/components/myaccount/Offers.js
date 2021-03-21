import React from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import CouponCard from '../common/CouponCard';
import { BaseUrl } from '../../BaseUrl';

function Offers(props) {
    const [promoData, setpromoData] = React.useState([]);

    React.useEffect(() => {
        try {
            const fetchData = async () => {
                const result = await axios.get(`${BaseUrl}/api/promocode/get`);

                if (result.data) {
                    setpromoData(result.data);
                } else {
                    console.log('error');
                }
            };
            fetchData();
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <>
            <div className="p-4 bg-white shadow-sm">
                <Row>
                    <Col md={12}>
                        <h4 className="font-weight-bold mt-0 mb-3">Offers For You</h4>
                    </Col>

                    {promoData.map((item) => {
<<<<<<< HEAD
                        console.log(item.Percentage);
                        var promotitle = "Get "+item.Percentage+ "% off";
                        console.log(promoData);
=======
                        var promotitle = 'Get ' + item.Percentage + '% off';

>>>>>>> f4b0f440d84156b2641ce1966a162ab452c30d64
                        return (
                            <Col md={6}>                                
                                <CouponCard
<<<<<<< HEAD
                                    title= {promotitle}
=======
                                    title={promotitle}
>>>>>>> f4b0f440d84156b2641ce1966a162ab452c30d64
                                    logoImage="img/bank/1.png"
                                    subTitle={item.Description}
                                    copyBtnText="COPY CODE"
                                    couponCode={item.code}
                                    noBorder={false}
                                />
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </>
    );
}

export default Offers;
