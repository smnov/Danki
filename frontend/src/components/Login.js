import { Button } from "@mui/material"
import "./Login.css"

export default function Login() {

    const login = () => {

    }
    return (
        <div className="box">
            <h3 className="header">Login</h3>
            <form className="login">
                <input type="text" placeholder="username" className="login-input"/>
                <br />
                <input type="password" placeholder="password" className="login-input" />
                <br />
                <Button type="submit" variant="outlined" className="login-btn" onClick={login}>Login</Button>
            </form>
        </div>
    )
}