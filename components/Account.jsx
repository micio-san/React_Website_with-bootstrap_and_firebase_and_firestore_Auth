import React, { useContext, useState, useEffect } from 'react'
import { Container, Button, Image, Row, Col } from "react-bootstrap"
import { firebaseCtx } from "../FirebaseCtx"
import { useNavigate } from "react-router-dom"
import { onSnapshot, doc } from "firebase/firestore"
import { db } from '../FirebaseConfig'
import Charactercard from './Charactercard'
import EditModal from './EditModal'

function Account() {
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const { user, lightMode, logOut, sendEmailVerif } = useContext(firebaseCtx)
    const userEmail = user?.email
    const indexEmail = userEmail?.lastIndexOf("@")
    const fixedEmail = userEmail?.slice(0, Number(indexEmail))
    const Navigate = useNavigate()
    const [faves, setFaves] = useState([])
    const [editModal, setEditModal] = useState(false)


    async function exitAccount() {
        try {
            await logOut()
        } catch (error) {
            console.log(error.message)
        }
        setIsLoggedIn(false)
    }

    if (!isLoggedIn) {
        Navigate("/")
    }

    const docRef = doc(db, "users", user?.email)

    useEffect(() => {
        onSnapshot(docRef, a => {
            setFaves(a.data()?.faveChars)
        })
    }, [user])


    async function verifyEmail() {
        try {
            await sendEmailVerif()
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <Container style={{ minHeight: "100vh" }} fluid className={lightMode ? " bg-light text-dark" : " bg-dark text-light"} >
            <EditModal editModal={editModal} setEditModal={setEditModal} />
            <Container fluid="lg" className={lightMode ? 'sm border-bottom border-dark border-2' : 'sm border-bottom border-light border-2'} >
                <Row className='py-3'>
                    <Col className='col-6' >
                        <Image className={lightMode ? "img-profile border border-2 border-dark" : "img-profile border border-2 border-light"} src={user?.photoURL ? user.photoURL : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} />
                        <h2 className='text-capitalize' >{user?.displayName ? user.displayName : fixedEmail}</h2>
                    </Col>
                    <Col className='col-6 text-end d-flex align-items-end justify-content-center flex-column' >
                        <Button onClick={() => setEditModal(true)} variant={lightMode ? "outline-dark" : "outline-light"} size='lg' className='mx-2 my-1 py-1' >Edit Profile</Button>
                        <Button onClick={() => exitAccount()} variant={lightMode ? "dark" : "light"} size='lg' className='mx-2 my-1 py-1' >Log Out</Button>
                    </Col>
                    {
                        !user.emailVerified && <Col onClick={() => verifyEmail()} className='pointer mx-auto py-2 col-6 border border-3 rounded-4 border-danger text-danger' >
                            <h3 className='text-center'> Please Verify Your Email</h3>
                        </Col>
                    }

                </Row>
            </Container >
            <Container className='py-5'>
                <Row className='gy-3'>
                    {
                        faves?.map(char => {
                            return <Col className='col-12 col-sm-6 col-lg-4 col-xl-4 col-xxl-4' key={char.id}>
                                <Charactercard char={char} loved={true} />
                            </Col>
                        })
                    }
                </Row>
            </Container>
        </Container >
    )
}

export default Account