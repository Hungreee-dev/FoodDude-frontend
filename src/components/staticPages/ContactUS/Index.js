import React, { useState } from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faMobile } from '@fortawesome/free-solid-svg-icons';
import LocationOffice from '../../../assets/location.jpeg';
const Index = () => {
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [comment, setComment] = useState('');
    return (
        <div className="contact">
            <div className="contact_card shadow">
                <h3 className="contact_card_heading user_select_disable">GET IN TOUCH</h3>
                <div className="contact_card_details">
                    <div className="contact_card_popups">
                        <div className="contact_card_popups_social user_select_disable">
                            Our Social Media handle:{' '}
                            <a href="https://www.facebook.com/wefooddude" rel="noreferrer" target="_blank">
                                <i class="fa fa-facebook contact_card_popups_socio" aria-hidden="true"></i>
                            </a>
                            <a href="https://www.instagram.com/wefooddude/" rel="noreferrer" target="_blank">
                                <i class="fa fa-instagram contact_card_popups_socio" aria-hidden="true"></i>
                            </a>
                            <a href="https://www.linkedin.com/company/70449147/" rel="noreferrer" target="_blank">
                                <i class="fa fa-linkedin contact_card_popups_socio" aria-hidden="true"></i>
                            </a>
                            <a href="https://twitter.com/wefooddude" rel="noreferrer" target="_blank">
                                <i class="fa fa-twitter contact_card_popups_socio" aria-hidden="true"></i>
                            </a>
                            <a href="https://www.snapchat.com/add/wefooddude" rel="noreferrer" target="_blank">
                                <i class="fa fa-snapchat contact_card_popups_socio" aria-hidden="true"></i>
                            </a>
                        </div>
                        <div className="contact_card_popups_detail">
                            <i class="fa fa-envelope-o" aria-hidden="true"></i>{' '}
                            <a href="mailto:info@fooddude" rel="noreferrer" target="_blank">
                                Mail: info@fooddude
                            </a>
                        </div>
                        <div className="contact_card_popups_detail">
                            <FontAwesomeIcon icon={faPhone} />{' '}
                            <a href="tel:+916371830551" rel="noreferrer" target="_blank">
                                Phone: +91-6371830551
                            </a>
                        </div>
                        <div className="contact_card_popups_detail">
                            <i class="fa fa-whatsapp" aria-hidden="true"></i>{' '}
                            <a href="https://wa.me/+916371830551" rel="noreferrer" target="_blank">
                                Whatsapp: +91-6371830551
                            </a>
                        </div>
                        <div className="contact_card_popups_detail">
                            <FontAwesomeIcon icon={faMapMarkerAlt} />{' '}
                            <a href="https://maps.apple.com/?ll=20.2386,85.8397" rel="noreferrer" target="_blank">
                                Gouri Nagar,Old Town Samantarapur, Bhubaneswar, Khordha, Orissa, 751002
                            </a>
                        </div>
                        <img src={LocationOffice} alt="Office Location" className="contact_card_popups_location" />
                    </div>
                    {/*<div className="contact_card_direct">
                         <h4 className="contact_card_direct_heading user_select_disable">Leave Us A Comment</h4>
                        <form action="submit">
                            <div className="contact_card_direct_inputholder">
                                <input
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                    name="name"
                                    type="text"
                                    required
                                />
                                <label className={name !== '' && 'labelactive'} for="name">
                                    Name
                                </label>
                            </div>
                            <div className="contact_card_direct_inputholder">
                                <input
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    name="email"
                                    type="email"
                                    required
                                />
                                <label className={email !== '' && 'labelactive'} for="email">
                                    Email
                                </label>
                            </div>
                            <div className="contact_card_direct_inputholder-2">
                                <textarea
                                    value={comment}
                                    onChange={(e) => {
                                        setComment(e.target.value);
                                    }}
                                    name="comment"
                                    type="text"
                                    required
                                />
                                <label className={`label_alt ${comment !== '' && 'labelactive-2'}`} for="comment">
                                    Message
                                </label>
                            </div>
                            <button disabled={true} type="submit" className="contact_card_direct_submit">
                                Submit
                            </button> 
                        </form>
                    </div>*/}
                </div>
            </div>
        </div>
    );
};

export default Index;
