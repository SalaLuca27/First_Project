import { ROUTES } from "../Utils/routes";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

const ForgotPassword = () => {

    const navigate = useNavigate();
    const [verifyPassword, setVerifyPassword] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [openForm, setOpenForm] = useState(true);
    const [code, setCode] = useState("");

    const handleChange = (event) => {
        if(event.target.name === 'password'){
            setPassword(event.target.value);
        }
        else if(event.target.name === 'verifyPassword'){
            setVerifyPassword(event.target.value);
        }
        else if(event.target.name === 'code'){
            setCode(event.target.value);
        }
    }

    const handleClick = (event) => {
        event.preventDefault();
        if(code === '' || password === '' || verifyPassword === ''){
            throw alert('Compile all the fields');
        }
        if(password.length >= 8){
            if(password === verifyPassword){
                let user = Auth.forgotPasswordSubmit(username, code, password);
                console.log('user:', user);
                user
                    .then((data) => {
                        console.log('dataThen:', data);
                        if(data === 'SUCCESS'){
                            navigate(ROUTES.login);
                        }
                    })
                    .catch((error) => {
                        console.log('error:', error);
                        if(error.code === 'CodeMismatchException'){
                            alert('Wrong OTP insert');
                            handleClick();
                        }
                    })
                }
            else{
                alert('Password is not the same');
            }
        }else{
            alert('Password must be composed by 8 characters');
        }
    }

    const sendCode = async() => {

        await Auth.forgotPassword(username)
            .then((data)=>{
                console.log('data:', data);
                setOpenForm(false);
            })
            .catch((error)=>{
                console.log('errore:', error);
                if(error){
                    alert('User ' + username.toUpperCase() + ' not found');
                }
            })
    }

    return (

        <div className="form">
            {!openForm ? 

                <form>
                    <div className="mb-3">
                        <label className="form-label">Code</label>
                        <input type="text" className="form-control" placeholder="000000" name="code" onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="password" minLength={8} name="password" onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="verifyPassword" placeholder="password" minLength={8} name="verifyPassword" onChange={handleChange} required/>
                    </div>
                    <div className = "buttonContainer">
                        <button className="btn btn-primary" onClick={handleClick}>Cambia Password</button>
                    </div>
                </form>

            : 
            
                <>
                    <div className="mb-3">
                        <label className="form-label">Inserisci username</label>
                        <input type="text" className="form-control" name="code" placeholder="username" onChange={(event)=>setUsername(event.target.value)} required/>
                    </div>
                    <div className = "buttonContainer">
                        <button className="btn btn-primary" onClick={sendCode}>Invia codice</button>
                    </div>
                    
                    <Link className="nav-item nav-link" to={{pathname : ROUTES.login}}>
                        Back to login
                    </Link>
                </>
            }
        </div>
    )
}

export default ForgotPassword;