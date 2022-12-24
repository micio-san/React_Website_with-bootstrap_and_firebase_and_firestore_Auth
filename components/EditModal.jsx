import React, { useContext, useState } from 'react'
import { Modal, ModalDialog, ModalHeader, Button, Form, InputGroup } from "react-bootstrap"
import { firebaseCtx } from "../FirebaseCtx"
import { FaTimes } from "react-icons/fa"


function EditModal({ editModal, setEditModal }) {
    const { lightMode, updateCurrentUser } = useContext(firebaseCtx)
    const [name, setName] = useState("")
    const [photo, setPhoto] = useState("")

    async function handleUpdates(e) {
        e.preventDefault()
        const newName = name
        const newPhoto = photo
        try {
            await updateCurrentUser(newName, newPhoto)
            setEditModal(false)
        } catch (error) {
            console.log(error.response)
        }
    }


    return (
        <Modal animation={true} size='md' centered show={editModal}>
            <ModalDialog className={lightMode ? "bg-light text-dark border border-dark m-0 rounded-4" : "bg-dark text-light border border-light m-0 rounded-4"} >
                <ModalHeader className={lightMode ? "bg-light text-dark border-0 d-flex flex-column w-100" : "bg-dark text-light border-0 d-flex flex-column w-100"} >
                    <div className='w-100 text-end' >
                        <FaTimes onClick={() => setEditModal(false)} />
                    </div>
                    <Modal.Title>
                        Update You Profile
                    </Modal.Title>
                </ModalHeader>
                <Modal.Body className={lightMode ? "bg-light text-dark" : "bg-dark text-light"}  >
                    <Form onSubmit={(e) => handleUpdates(e)} className='text-center'>
                        <InputGroup className='my-4'>
                            <Form.Control placeholder='Your New User Name' onChange={(e) => setName(e.target.value)} className={lightMode ? "bg-light text-dark" : "bg-dark text-light"} type='text'></Form.Control>
                        </InputGroup>
                        <InputGroup className='my-4'>
                            <Form.Control placeholder='Your New Photo Url' onChange={(e) => setPhoto(e.target.value)} className={lightMode ? "bg-light text-dark" : "bg-dark text-light"} type='text'></Form.Control>
                        </InputGroup>
                        <Button type="submit" variant={lightMode ? "dark" : "light"} size='lg' className='mx-auto my-1 py-1'>Update Profile</Button>
                    </Form>
                </Modal.Body>
            </ModalDialog>
        </Modal >

    )
}

export default EditModal