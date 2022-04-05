import { ROUTES } from "../Utils/routes";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { gql } from "apollo-boost";
// import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { Auth } from "aws-amplify";

const Registrazione = () => {

    //username, email, psw, conferma psw

    const navigate = useNavigate();
    const [pswError, setPswError] = useState(false);
    const [email, setEmail] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");

    // const CREATE = gql`
    // mutation Create($name: String!, $surname: String!, $age: Int!, $username: String!, $password: String!) {
    //     create(name: $name, surname: $surname, age: $age, username: $username, password: $password) {
    //         id
    //         name
    //         surname
    //         age
    //         password
    //         username
    //     }
    // }`;


    const handleChange = (event) => {
        if(event.target.name === 'username'){
            setUsername(event.target.value);
        }
        else if(event.target.name === 'password'){
            setPassword(event.target.value);
        }
        else if(event.target.name === 'verifyPassword'){
            setVerifyPassword(event.target.value);
        }
        else if(event.target.name === 'email'){
            setEmail(event.target.value);
        }
        else{
            setPassword(event.target.value);
        }
    }

    // const [register, {error}] = useMutation(CREATE,{variables: {'name' : name, 'surname': surname, 'age': parseInt(age), 
    // 'username': username, 'password': password}})

    const handleClick = (event) => {
        event.preventDefault();
        if(password === verifyPassword){

            const user = Auth.signUp(username, password, email);
            console.log(user);
            // user.then((data) =>{ console.log(data.user)});
        }
        else{
            setPswError(true);
            console.log('Password no match')
        }
    }

    return (

        <div className="form">
            <form>
                {pswError ? 'Password is not the same' : ''}
                <br/>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" placeholder="username" name="username" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="password" name="password" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="verifyPassword" placeholder="password" name="verifyPassword" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="email@email.com" name="email" onChange={handleChange}/>
                </div>
                <div className = "buttonContainer">
                    <button className="btn btn-primary" onClick={handleClick}>Registrati</button>
                </div>
                <div>
                <p id="p-registrazione">
                    Hai già un account?
                </p>
                <Link className="nav-item nav-link" to={{pathname : ROUTES.login}}>
                    Loggati!
                </Link>
                </div>
            </form>
        </div>
    )
}

export default Registrazione;