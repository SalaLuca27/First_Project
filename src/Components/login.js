import {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../Utils/routes";
import '../css/login.css';
import { gql, useMutation } from '@apollo/client';

const LoginUser = () => {    

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    
    const LOGIN = gql`
        mutation Login($username: String!, $password: String!) {
            login(username: $username, password: $password)
        }`;

    const handleChange = (event) => {
        if(event.target.name === 'username') {
            setUsername(event.target.value);
        } else {
            setPassword(event.target.value);
        }
    }

    const [login, {loading}] = useMutation(LOGIN, {variables : {'username' : username, 'password' : password}});

    const handleClick = async(event) => {
        event.preventDefault();
        await login().then( (ret) => {setToken(ret.data.login)});
    }

    useEffect(() => {
        
        if(token !== "" && token !== 'error') {
            localStorage.setItem("token", token)
            navigate(ROUTES.home)
        }
    },[token, navigate]);

    if(loading) return <h1>Loading...</h1>

    return (
        <div className="form">
            {token === 'error' ? (
                <div className="errorLogin">
                    <h3 id="titleEL">Utente non trovato!</h3>
                </div>
            ) : ""
            }
            <form>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" placeholder="username" name="username" onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="password" name="password" onChange={handleChange} autoComplete="on" required/>
                </div>
                <div className = "buttonContainer">
                    <button className="btn btn-primary" onClick={handleClick}>Accedi</button>
                </div>
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