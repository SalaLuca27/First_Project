import { ROUTES } from "../Utils/routes";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Auth } from "aws-amplify";

const Registrazione = () => {

    const navigate = useNavigate();
    const [pswError, setPswError] = useState(false);
    const [email, setEmail] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [openForm, setOpenForm] = useState(true);
    const [code, setCode] = useState("");
    const [lenghtError, setLengthError] = useState(false);

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
        if(password.length >= 8){
            if(password === verifyPassword){
                const user = Auth.signUp(username, password, email);
                console.log('user:', user);
                user
                    .then(data => {
                        setOpenForm(false);
                    })
                    .catch(error => {
                        if(error.message === 'User already exists'){
                            alert('Username già utilizzato');
                        }
                    })
            }
            else{
                setPswError(true);
                console.log('Password no match')
            }
        }else{
            setLengthError(true);
        }
    }

    const confirm = () => {
        if(code === ''){
            alert('OTP can not be null');
            navigate(ROUTES.registrazione);
            setOpenForm(false);
        }
        else{
            const user = Auth.confirmSignUp(username, code);
            user
                .then((data)=> {
                    console.log('data:', data)
                    navigate(ROUTES.login);
                })
                .catch((error)=> {
                    console.log('error:', error);
                    alert('OTP code not correct');
                })
        }
    }

    return (

        <div className="form">
            {openForm ? 

                <form>
                    {lenghtError ? 'Lunghezza minima password 8 caratteri' : ''}
                    <br/>
                    {pswError ? 'Password is not the same' : ''}
                    <br/>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" placeholder="username" name="username" onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="password" minLength={8} name="password" onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="verifyPassword" placeholder="password" minLength={8} name="verifyPassword" onChange={handleChange}/>
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

            : 
            
                <form>
                    <div className="mb-3">
                        <label className="form-label">Inserici codice OTP</label>
                        <input type="text" className="form-control" name="code" onChange={(event) => setCode(event.target.value)} />
                    </div>
                    <div className = "buttonContainer">
                        <button className="btn btn-primary" onClick={confirm}>Conferma codice</button>
                    </div>
                </form>

            }
        </div>
    )
}

export default Registrazione;