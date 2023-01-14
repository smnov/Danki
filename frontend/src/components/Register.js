import { Button } from "@mui/material"
import "./Register.css"

export default function Register() {

    const register = () => {
        
    }
    return (
        <div className="register">
        <h3>Register</h3>
        <form>
            <input type="email" placeholder="email" />
            <br />
            <input type="text" placeholder="username"/>
            <br />
            <input type="password" placeholder="password" />
            <br />
            <Button type="submit" variant="outlined" onClick={register}>Register</Button>
        </form>
    </div>
    )
}