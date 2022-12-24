import React, { useContext, useState } from 'react'
import { Modal, ModalHeader, Form, InputGroup, ModalDialog, Button, Container } from "react-bootstrap"
import { firebaseCtx } from "../FirebaseCtx"
import { FaTimes } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'


function SignUp({ modalSignUp, setSignUpModal }) {
    const { lightMode, signUp, user } = useContext(firebaseCtx)
    const [visible, setVisible] = useState(false)
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [error, setError] = useState("")
    const Navigator = useNavigate()

    async function handleForm(e) {
        e.preventDefault()
        try {
            await signUp(email, pass)
        } catch (err) {
            setError(err)
        }
    }

    useEffect(() => {
        setError("")
        if (user) {
            Navigator("/account")
            setSignUpModal(false)
        }
    }, [user])

    return (
        <Modal animation={true} size='md' centered show={modalSignUp}>
            <ModalDialog className={lightMode ? "bg-light text-dark border border-dark m-0 rounded-4" : "bg-dark text-light border border-light m-0 rounded-4"} >
                <ModalHeader className={lightMode ? "bg-light text-dark border-0 d-flex flex-column w-100" : "bg-dark text-light border-0 d-flex flex-column w-100"} >
                    <div className='w-100 text-end' >
                        <FaTimes onClick={() => setSignUpModal(false)} />
                    </div>
                    <Modal.Title>
                        Sign Up!
                    </Modal.Title>
                </ModalHeader>
                <Modal.Body className={lightMode ? "bg-light text-dark" : "bg-dark text-light"}  >
                    <Form onSubmit={(e) => handleForm(e)} className='text-center'>
                        <InputGroup className='my-4'>
                            <Form.Control onChange={(e) => setEmail(e.target.value)} className={lightMode ? "bg-light text-dark" : "bg-dark text-light"} type='text'></Form.Control>
                        </InputGroup>
                        <InputGroup className='my-4'>
                            <Form.Control onChange={(e) => setPass(e.target.value)} className={lightMode ? "bg-light text-dark" : "bg-dark text-light"} type={visible ? "text" : "password"}></Form.Control>
                        </InputGroup>
                        <Container className='d-flex p-0 m-0' fluid >
                            <Form.Check
                                type="checkbox"
                                onClick={(e) => setVisible(prev => !prev)}
                            /> <label className='mx-1' > {visible ? "Hide " : " Show"} password</label></Container>
                        <Button type="submit" variant={lightMode ? "dark" : "light"} size='lg' className='mx-auto my-1 py-1'>Sign Up</Button>
                    </Form>
                    <p className='text-danger my-2' >{error?.message}</p>
                </Modal.Body>
            </ModalDialog>
        </Modal >
    )
}

export default SignUp