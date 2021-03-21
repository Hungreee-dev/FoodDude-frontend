import React from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Image, Badge } from 'react-bootstrap';
import DropDownTitle from '../common/DropDownTitle';
import Cart from '../cart/Cart';
import Icofont from 'react-icofont';
import LinkToLinking from '../LinkToLinking/index';
import { useAuth } from '../../contexts/AuthContext';
const asyncLocalStorage = {
    setItem: async function (key, value) {
        return Promise.resolve().then(function () {
            localStorage.setItem(key, value);
        });
    },
    getItem: async function (key) {
        return Promise.resolve().then(function () {
            return localStorage.getItem(key);
        });
    },
};
function Header(props) {
    const node = React.useRef();
    const [isNavExpanded, setNavExpanded] = React.useState(false);
    const { logout, currentUser, setCurrentUser, verifiedPhone } = useAuth();
    const history = useHistory();
    const [error, setError] = React.useState('');

    React.useEffect(() => {
        (async () => {
            const res = await asyncLocalStorage.getItem('userData');
            const data = await JSON.parse(res);
            setCurrentUser(data ? data.user : null);
        })();
    }, []);

    const setIsNavExpanded = () => {
        setNavExpanded(true);
    };
    const closeMenu = () => {
        setNavExpanded(false);
    };

    const handleClick = (e) => {
        if (node.contains(e.target)) {
        } else {
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
                                <Nav.Link eventKey={0} as={NavLink} activeclassname="active" exact to="/detail">
                                    Make an Order <span className="sr-only">(current)</span>
                                </Nav.Link>
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
            </div>
        </>
    );
}

export default Header;
