import {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../Utils/routes";
import '../css/login.css';
// import { gql, useMutation } from '@apollo/client';
import { Auth } from 'aws-amplify';

const LoginUser = () => {    

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [error, setError] = useState(false);
    
    // const LOGIN = gql`
    //     mutation Login($username: String!, $password: String!) {
    //         login(username: $username, password: $password)
    //     }`;

    const handleChange = (event) => {
        if(event.target.name === 'username') {
            setUsername(event.target.value);
        } else {
            setPassword(event.target.value);
        }
    }

    // const [login, {loading}] = useMutation(LOGIN, {variables : {'username' : username, 'password' : password}});

    const handleClick = async(event) => {
        if(username === '' || password === ''){
            setError(true);
        }else{
            event.preventDefault();
            const user = Auth.signIn(username, password);
            user
            .then((data) => setToken(data.signInUserSession.accessToken.jwtToken))
            .catch((error) => {if(error){setError(true)}})
        }

        if(!error){
            alert('Verificare che tutti i campi inseriti siano corretti')
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