import React, { useState } from "react"
import {Card, Button, Alert, Container} from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import '../../style/auth/Dashboard.scss';

export default function Dashboard() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/signin")
        } catch {
            setError("Failed to log out")
        }
    }

    return (
        <div style={{display: "flex", flexDirection: "row"}}>
            <div>
                <img src={'/assets/vector-creator.png'} id={'brand-logo'} alt={'brand-logo'} className={'picc'} height={'350'} width={'350'}/>
            </div>
            <div
                className="d-flex w-100 align-items-center justify-content-center"
                style={{minHeight: "100vh"}}>

                <div className="w-100" style={{maxWidth: "400px", marginRight: "26rem"}}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Profile Data</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <strong>Email:</strong> {currentUser.email}
                            <Link to="/userdata" className="btn btn-primary w-100 mt-3 hoverbut" >
                                Update My Data
                            </Link>
                            <Link to="/preferences" className="btn btn-primary w-100 mt-3 hoverbut" >
                                Update Preferences
                            </Link>
                            <Link to="/pictures" className="btn btn-primary w-100 mt-3 hoverbut" >
                                Update Pictures
                            </Link>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        <Button variant="link" onClick={handleLogout}>
                            Log Out
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
