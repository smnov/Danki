import { Button } from "@mui/material"
import { useState } from "react";
import Alert from "@mui/material/Alert";
import "./Login.css"

export default function Login({ setLoginOpen, setCookies }) {
    const BASE_URL = 'http://localhost:8000/'
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [alert, setAlert] = useState(false)

    const login = (event) => {
        event?.preventDefault();
        const json_string = JSON.stringify({
            username: username,
            password: password
        })

        const requestOptions = {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: json_string
        }
        fetch(BASE_URL + 'login', requestOptions)
        .then(response => {
            if (response.ok) {
                console.log(response)
                return response.json()
            }
            throw response
        })
        .catch(error => {
            console.log(error);
            setAlert(true)
        })
        .then(data => {
            setCookies("token", data.token, {
                path: "/"
            })
            setLoginOpen(false)

        })
    }
    return (
        <div className="box">
            <h3 className="header">Login</h3>
            <form className="login">
                <input 
                    type="text" 
                    placeholder="username" 
                    className="login-input"
                    value = {username || ""}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                <br />
                <input 
                    type="password" 
                    placeholder="password" 
                    className="login-input" 
                    value = {password || ""}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                <br />
                <Button type="submit" onClick={login} variant="outlined" className="login-btn">Login</Button>
            </form>
            {alert && <Alert onClose={() => setAlert(false)} severity="error">Invalid username and/or password</Alert>}
        </div>
    )
}