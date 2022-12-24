import React, { useContext, useState } from 'react'
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { Card, CardImg } from "react-bootstrap"
import { firebaseCtx } from "../FirebaseCtx"
import { db } from '../FirebaseConfig'
import { updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore"


function Charactercard({ char, loved }) {
    const { lightMode, user } = useContext(firebaseCtx)
    const [liked, setLiked] = useState(loved)
    const [faveArray, setFaveArray] = useState([])



    function handleFavorite() {
        if (!user) {
            alert("You Have to Be logged in!")
            return
        }
        const docRef = doc(db, "users", user.email)
        setLiked(prev => !prev);
        if (!liked) {
            updateDoc(docRef, {
                faveChars: arrayUnion(char)
            })
        } else {
            updateDoc(docRef, { faveChars: arrayRemove(char) })
        }
    }

    return (
        <Card className={lightMode ? "bg-light border border-dark cardStyle text-light shadow" : "bg-dark border border-light cardStyle text-light shadow"} >
            <CardImg src={char.imageUrl} />
            <Card.ImgOverlay className='overlay p-1'>
                <Card.Header className='p-1 d-flex justify-content-between border-0' >
                    <Card.Title >
                        {char.fullName}
                    </Card.Title>
                    < div onClick={() => handleFavorite()} >{liked ? <BsHeartFill /> : <BsHeart />}</div>
                </Card.Header>
                <Card.Body className='p-1'>
                    <p>{char.title ? char.title : ""}</p>
                </Card.Body>
            </Card.ImgOverlay>
        </Card>
    )
}

export default Charactercard