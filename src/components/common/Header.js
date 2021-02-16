import React from 'react';
import axios from 'axios';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Image, Badge } from 'react-bootstrap';
import DropDownTitle from '../common/DropDownTitle';
import Cart from '../cart/Cart';
import Icofont from 'react-icofont';
import LinkToLinking from '../LinkToLinking/index';
import { useAuth } from '../../contexts/AuthContext';

function Header(props) {
    const node = React.useRef();
    const [isNavExpanded, setNavExpanded] = React.useState(false);
    const { logout, currentUser, verifiedPhone } = useAuth();
    const history = useHistory();
    const [error, setError] = React.useState('');
    //const userData=JSON.parse(localStorage.getItem('userData'))

    //   const [showSignOutModal,setSignOutModal]=React.useState(false)
    const setIsNavExpanded = () => {
        setNavExpanded(true);
    };
    const closeMenu = () => {
        setNavExpanded(false);
    };

    const handleClick = (e) => {
        if (node.contains(e.target)) {
            // if clicked inside menu do something
        } else {
            // If clicked outside menu, close the navbar.
            setNavExpanded(false);
        }
    };
    React.useEffect(() => {
        document.addEventListener('click', handleClick, false);

        return document.removeEventListener('click', handleClick, false);
    });

    async function handleLogout() {
        setError('');
        try {
            await logout();
            await localStorage.clear();
            props.onHide();
            history.push('/');
        } catch {
            setError('Failed to log out');
        }
    }
    return (
        <>
            {!verifiedPhone && <LinkToLinking />}
            <div ref={node}>
                <Navbar
                    onToggle={setIsNavExpanded}
                    expanded={isNavExpanded}
                    bg="light"
                    expand="lg"
                    className="navbar-light osahan-nav shadow-lg"
                >
                    <Container>
                        <Navbar.Brand to="/">
                            <Image src="/img/logo-fd-round.png" alt="" height="60px" />
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse id="navbarNavDropdown">
                            <Nav activeKey={0} className="ml-auto" onSelect={closeMenu}>
                                <Nav.Link eventKey={0} as={NavLink} activeclassname="active" exact to="/">
                                    Home <span className="sr-only">(current)</span>
                                </Nav.Link>
                                {
                                    //This is the Offers Nav-Link-- Commented Out
                                    /* <Nav.Link eventKey={1} as={NavLink} activeclassname="active" to="/offers">
             				<Icofont icon='sale-discount'/> Offers <Badge variant="danger">New</Badge>
			            </Nav.Link> */
                                }

                                <Nav.Link eventKey={0} as={NavLink} activeclassname="active" exact to="/detail">
                                    Make an Order <span className="sr-only">(current)</span>
                                </Nav.Link>
                                {/* <NavDropdown title="Restaurants" alignRight className="border-0">
							{ // This is the Listing Nav-Link Commented out
							/* <NavDropdown.Item eventKey={2.1} as={NavLink} activeclassname="active" to="/listing">Listing</NavDropdown.Item> }
			            	<NavDropdown.Item eventKey={2.2} as={NavLink} activeclassname="active" to="/detail">Detail + Cart</NavDropdown.Item>
			            	{currentUser?<NavDropdown.Item eventKey={2.3} as={NavLink} activeclassname="active" to="/checkout">Checkout</NavDropdown.Item>:null}
			            </NavDropdown> */}
                                {/* <NavDropdown title="Pages" alignRight>
			            	<NavDropdown.Item eventKey={3.1} as={NavLink} activeclassname="active" to="/track-order">Track Order</NavDropdown.Item>
			            	<NavDropdown.Item eventKey={3.2} as={NavLink} activeclassname="active" to="/invoice">Invoice</NavDropdown.Item>
			            	<NavDropdown.Item eventKey={3.3} as={NavLink} activeclassname="active" to="/login">Login</NavDropdown.Item>
			            	<NavDropdown.Item eventKey={3.4} as={NavLink} activeclassname="active" to="/register">Register</NavDropdown.Item>
			            	<NavDropdown.Item eventKey={3.5} as={NavLink} activeclassname="active" to="/404">404</NavDropdown.Item>
			            	<NavDropdown.Item eventKey={3.6} as={NavLink} activeclassname="active" to="/extra">Extra</NavDropdown.Item>

			            </NavDropdown> */}
                                {currentUser ? (
                                    <NavDropdown
                                        alignRight
                                        title={
                                            <DropDownTitle
                                                className="d-inline-block"
                                                image="https://cdn0.iconfinder.com/data/icons/profession-and-occupation-icons/110/avatar_occupation_profile_cook_kitchener_flunkey_food-512.png"
                                                imageAlt="user"
                                                imageClass="nav-osahan-pic rounded-pill"
                                                title="My Account"
                                            />
                                        }
                                    >
                                        <NavDropdown.Item
                                            eventKey={4.1}
                                            as={NavLink}
                                            activeclassname="active"
                                            to="/myaccount/orders"
                                        >
                                            <Icofont icon="food-cart" /> Orders
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            eventKey={4.2}
                                            as={NavLink}
                                            activeclassname="active"
                                            to="/myaccount/offers"
                                        >
                                            <Icofont icon="sale-discount" /> Offers
                                        </NavDropdown.Item>
                                        {/* <NavDropdown.Item eventKey={4.3} as={NavLink} activeclassname="active" to="/myaccount/favourites"><Icofont icon='heart'/> Favourites</NavDropdown.Item>
							<NavDropdown.Item eventKey={4.4} as={NavLink} activeclassname="active" to="/myaccount/payments"><Icofont icon='credit-card'/> Payments</NavDropdown.Item> */}
                                        <NavDropdown.Item
                                            eventKey={4.5}
                                            as={NavLink}
                                            activeclassname="active"
                                            to="/myaccount/addresses"
                                        >
                                            <Icofont icon="location-pin" /> Addresses
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                ) : null}
                                {currentUser ? <Cart /> : null}
                                {currentUser ? (
                                    <Nav.Link eventKey={2} as={NavLink} to="/" onClick={handleLogout}>
                                        <Icofont icon="login" /> Sign Out
                                    </Nav.Link>
                                ) : null}
                                {!currentUser ? (
                                    <Nav.Link eventKey={2} as={NavLink} activeclassname="active" to="/login">
                                        <Icofont icon="login" /> Sign In
                                    </Nav.Link>
                                ) : null}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                {/* <SignOutModal show={showSignOutModal} onHide={hideSignOutModal}/> */}
            </div>
        </>
    );
}

export default Header;
