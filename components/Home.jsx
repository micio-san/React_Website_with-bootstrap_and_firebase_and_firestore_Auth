import React, { useEffect, useContext, useState } from 'react'
import Charactercard from "./Charactercard"
import { firebaseCtx } from "../FirebaseCtx"
import { Container, Row, Col, Spinner } from "react-bootstrap"


function Home() {
    const { lightMode } = useContext(firebaseCtx)
    const [charachters, setCharachters] = useState([])

    function getCharachters() {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'game-of-thrones1.p.rapidapi.com'
            }
        };

        fetch('https://game-of-thrones1.p.rapidapi.com/Characters', options)
            .then(response => response.json())
            .then(response => setCharachters(response))
            .catch(err => console.error(err));
    }


    useEffect(() => {
        getCharachters()
    }, [])


    function Loading() {
        return <Container fluid style={{ height: "100vh" }} className='col-12 w-100 d-flex align-items-center justify-content-center' >
            <Spinner className={lightMode ? "text-dark" : "text-light"} animation="border" role="status">
            </Spinner>
        </Container>
    }


    return (
        <Container fluid className={lightMode ? "bg-light text-dark" : "bg-dark text-light"}>
            <Row className='py-3 gy-3'>
                {
                    charachters.length === 0 ? Loading() :
                        charachters.map((char, idx) => {
                            return <Col className='col-12 col-sm-6 col-lg-4 col-xl-3 col-xxl-2' key={idx}>
                                <Charactercard loved={false} char={char} />
                            </Col>
                        })
                }
            </Row>
        </Container>
    )
}

export default Home