import { ROUTES } from "../Utils/routes";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Auth } from "aws-amplify";

const Registrazione = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [openForm, setOpenForm] = useState(true);
    const [code, setCode] = useState("");

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

    const handleClick = (event) => {
        event.preventDefault();
        if(username === '' || password === '' || verifyPassword === '' || email === ''){
            throw alert('Compile all the fields');
        }
        if(password.length >= 8){
            if(password === verifyPassword){
                const user = Auth.signUp(username, password, email);
                console.log('user:', user);
                user
                    .then((data) => {
                        console.log('data:', data);
                        setOpenForm(false);
                    })
                    .catch((error) => {
                        console.log('error:', error);
                        if(error.message === 'User already exists'){
                            alert('Username già utilizzato');
                        }
                        else if(error.message === 'Invalid email address format.'){
                            alert('Email not valid');
                        }
                    })
            }
            else{
                alert('Password is not the same')
            }
        }else{
            alert('Password must be composed by 8 characters');
        }
    }

    const confirm = () => {
        if(code.length !== 6 || code === ''){
            throw alert('Incorrect code');
        }

        const user = Auth.confirmSignUp(username, code);
        user
            .then((data)=> {
                console.log('dataConfirm:', data)
                navigate(ROUTES.login);
            })
            .catch((error)=> {
                console.log('errorConfirm:', error);
                alert('OTP code not correct');
            })
        
    }

    return (

        <div className="form">
            {openForm ? 

                <form>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" placeholder="username" name="username" onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="password" minLength={8} name="password" onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="verifyPassword" placeholder="password" minLength={8} name="verifyPassword" onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" placeholder="email@email.com" name="email" onChange={handleChange} required/>
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

            : 
            
                <form>
                    <div className="mb-3">
                        <label className="form-label">Inserici codice OTP</label>
                        <input type="text" className="form-control" name="code" onChange={(event)=>setCode(event.target.value)} />
                    </div>
                    <div className = "buttonContainer">
                        <button id= "button" className="btn btn-primary" onClick={confirm}>Conferma codice</button>
                    </div>
                </form>

            }
        </div>
    )
}

export default Registrazione;