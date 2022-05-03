import {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../Utils/routes";
import '../css/login.css';
import { Auth } from 'aws-amplify';

const LoginUser = () => {    

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    
    const handleChange = (event) => {
        if(event.target.name === 'username') {
            setUsername(event.target.value);
        } else {
            setPassword(event.target.value);
        }
    }

    const handleClick = async(event) => {
        if(username === '' || password === ''){
            alert('Compilare tutti i campi');
        }else{
            event.preventDefault();
            await Auth.signIn(username.trim(), password.trim())
                .then((data) => {
                    localStorage.setItem('sidebarUsername', data.username);
                    setToken(data.signInUserSession.accessToken.jwtToken);
                })
                .catch((error) => {
                    if(error){
                        alert('Username o password errati');
                    }
                })
        }
    }

    useEffect(() => {
        
        if(token !== "" && token !== 'error') {
            localStorage.setItem("token", token)
            navigate(ROUTES.home)
        }
    },[token, navigate]);

    return (
        <div className="form">
            <form>
                <br/>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" placeholder="username" name="username" onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="password" name="password" onChange={handleChange} required/>
                </div>
                <div className = "buttonContainer">
                    <button className="btn btn-primary" onClick={handleClick}>Accedi</button>
                </div>
                <Link className="nav-item nav-link" to={{pathname : ROUTES.forgotPassword}}>
                    Forgot Password
                </Link>
                <div>
                <p id="p-registrazione">
                    Non hai ancora un account? 
                </p>
                <Link className="nav-item nav-link" to={{pathname : ROUTES.registrazione}}>
                    Registrati!
                </Link>
                </div>
            </form>
        </div>
    )
}

export default LoginUser;