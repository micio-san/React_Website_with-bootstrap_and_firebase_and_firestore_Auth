import React, { useContext, useState } from 'react'
import { Navbar, NavbarBrand, Nav, Container, Button, Image } from "react-bootstrap"
import { GiCrossedSwords, GiSun, GiMoon } from "react-icons/gi"
import { Link } from "react-router-dom"
import { firebaseCtx } from "../FirebaseCtx"
import SignUp from './SignUp'
import LogIn from "./LogIn"

function Navcomponent() {

    const { lightMode, setLightMode, user } = useContext(firebaseCtx)
    const [modalSignUp, setSignUpModal] = useState(false)
    const [modalLogIn, setLogInModal] = useState(false)

    return (
        <Navbar bg={lightMode ? "light" : "dark"} variant={lightMode ? "light" : "dark"} className='border-bottom d-flex flex-md-column justify-content-between shadow-lg'>
            <SignUp modalSignUp={modalSignUp} setSignUpModal={setSignUpModal} />
            <LogIn modalLogIn={modalLogIn} setLogInModal={setLogInModal} />
            <Container  >
                <NavbarBrand>
                    <Link to="/">
                        <GiCrossedSwords className={lightMode ? 'text-dark' : 'text-light'} />
                    </Link>
                </NavbarBrand>

                <Nav className='align-items-center justify-content-between ' style={{ width: "30%" }}>
                    {user ? <Link to={`/account`} >
                        <Image className='img rounded-5' src={user.photoURL ? user.photoURL : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} />
                    </Link> :
                        <Nav.Item>
                            <Button onClick={() => setLogInModal(true)} variant={lightMode ? "outline-dark" : "outline-light"} size='lg' className='mx-2 my-1 py-1'   >Log In</Button>
                            <Button onClick={() => setSignUpModal(true)} variant={lightMode ? "dark" : "light"} size='lg' className='mx-2 my-1 py-1' >Sign Up</Button>
                        </Nav.Item>}
                    <Nav.Item onClick={() => setLightMode(prev => !prev)} className='text-light' >
                        {lightMode ? <GiMoon className='text-dark' /> : <GiSun className='text-light' />}
                    </Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Navcomponent