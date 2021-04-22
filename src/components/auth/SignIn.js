import React, { useRef, useState } from "react"
import { Form, Button, Card} from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { Container } from "react-bootstrap"
import Alert from '@material-ui/lab/Alert';
import "../../style/auth/SignUpIn.scss";

export default function SignIn() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await login(email, password)
            history.push("/")
        } catch {
            setError("Failed to log in")
        }

        setLoading(false)
    }

    const handleChangeEmail = event =>{
        setEmail(event.target.value)
    }

    const handleChangePassword = event =>{
        setPassword(event.target.value)
    }

    return (
        <>
            <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Log In</h2>
                        {error && <Alert severity="error">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" required onChange={(event) => handleChangeEmail(event)}/>
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" required onChange={(event) => handleChangePassword(event)}/>
                            </Form.Group>
                            <Button disabled={loading} className="w-100" type="submit">
                                Log In
                            </Button>
                        </Form>
                        <div className="w-100 text-center mt-3">
                            <Link to="/forgot-password" className='forgotp' >Forgot Password?</Link>
                        </div>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Need an account? <Link to="/signup">Sign Up</Link>
                </div>
                </div>
            </Container>
        </>
    )
}