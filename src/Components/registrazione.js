import { ROUTES } from "../Utils/routes";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { gql } from 'graphql-tag';
import { API } from "aws-amplify";
import { create } from "../graphql/mutations";

const Registrazione = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [age, setAge] = useState();
    const [openForm, setOpenForm] = useState(false);
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
        else if(event.target.name === 'name'){
            setName(event.target.value);
        }
        else if(event.target.name === 'surname'){
            setSurname(event.target.value);
        }
        else if(event.target.name === 'age'){
            setAge(parseInt(event.target.value));
        }
        else if(event.target.name === 'password'){
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
                let user = Auth.signUp(username.trim(), password.trim(), email.trim());
                console.log('user:', user);
                user
                    .then((data) => {
                        console.log('data:', data);
                        // console.log('data sub: ', data.userSub.toString());
                        setOpenForm(true);
                    })
                    .catch((error) => {
                        console.log('error:', error);
                        if(error.message === 'User already exists'){
                            alert('Username already exists');
                        }
                        else if(error.message === 'Invalid email address format.'){
                            alert('Email not valid');
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

    async function createUser() {
        const apiData = await API.graphql({ query: gql(create), variables: {'name' : name, 'surname': surname,
            'age': parseInt(age),  'username': username.toLowerCase(), 'password': password}, 
            authMode: "AMAZON_COGNITO_USER_POOLS"})
        return apiData;
    }

    const confirm = async() => {
        if(code.length !== 6 || code === ''){
            alert('OTP code must have 6 characters');
            confirm();
        }

            await Auth.confirmSignUp(username.trim(), code.trim())
            .then((data)=>{
                console.log('dataConfirm:', data);
                if(data === 'SUCCESS')
                {
                    Auth.signIn(username, password)
                        .then((data) => {
                            localStorage.setItem('sidebarUsername', data.username.toLowerCase());
                            localStorage.setItem("token", data.signInUserSession.accessToken.jwtToken);
                            createUser()
                                .then((res) => {
                                    console.log('creazione utente dalla registrazione: ', res.data.create);
                                })
                                .catch((err) => {
                                    console.log('Errore creazione DYNAMO: ', err);
                                    alert('Error while saving data on DynamoDB');
                                    Auth.deleteUser();
                                    navigate(ROUTES.registrazione);
                                })
                            navigate(ROUTES.home);
                        })
                        .catch((error) => {
                            if(error){
                                console.log('errore nella creazione utente dalla registrazione: ', error);
                                alert('Username o password not correct');
                            }
                        })
                }

            })
            .catch((error)=>{
                console.log('errorConfirm:', error);
                alert('OTP code not correct');
                navigate(ROUTES.registrazione);
            })
    }


    return (

        <div className="form">
            {!openForm ?

                <form>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" placeholder="name" name="name" onChange={handleChange} required/>
                        <label className="form-label">Surname</label>
                        <input type="text" className="form-control" placeholder="surname" name="surname" onChange={handleChange} required/>
                        <label className="form-label">Age</label>
                        <input type="number" className="form-control" placeholder="age" name="age" onChange={handleChange} required/>
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" placeholder="username" name="username" onChange={handleChange} required/>
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="password" minLength={8} name="password" onChange={handleChange} required/>
                        <label className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="verifyPassword" placeholder="password" minLength={8} name="verifyPassword" onChange={handleChange} required/>
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
            
                <>
                    <div className="mb-3">
                        <label className="form-label">Inserici codice OTP</label>
                        <input type="text" className="form-control" name="code" placeholder="012345" onChange={(event)=>setCode(event.target.value)} required/>
                    </div>
                    <div className = "buttonContainer">
                        <button className="btn btn-primary" onClick={confirm}>Conferma codice</button>
                    </div>
                </>

            }
        </div>
    )
}

export default Registrazione;