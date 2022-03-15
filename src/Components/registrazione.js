import { ROUTES } from "../Utils/routes";
import { Link } from "react-router-dom";
import { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const Registrazione = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [age, setAge] = useState();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const CREATE = gql`
    mutation Create($name: String!, $surname: String!, $age: Int!, $username: String!, $password: String!) {
        create(name: $name, surname: $surname, age: $age, username: $username, password: $password) {
            id
            name
            surname
            age
            password
            username
        }
    }`;


    const handleChange = (event) => {
        if(event.target.name === 'name'){
            setName(event.target.value);
        }
        else if(event.target.name === 'surname'){
            setSurname(event.target.value);
        }
        else if(event.target.name === 'age'){
            setAge(event.target.value);
        }
        else if(event.target.name === 'username'){
            setUsername(event.target.value);
        }
        else{
            setPassword(event.target.value);
        }
    }

    const [register, {error}] = useMutation(CREATE,{variables: {'name' : name, 'surname': surname, 'age': parseInt(age), 
    'username': username, 'password': password}})

    const handleClick = (event) => {
        event.preventDefault();
        register();
        if(!error) {
            navigate(ROUTES.login);
        }
    }

    return (

        <div className="form">
            <form>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" placeholder="name" name="name" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Surname</label>
                    <input type="text" className="form-control" placeholder="surname" name="surname" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input type="number" className="form-control" placeholder="99" name="age" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" placeholder="username" name="username" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="password" name="password" autoComplete="on" onChange={handleChange}/>
                </div>
                <div className = "buttonContainer">
                    <button className="btn btn-primary" onClick={handleClick}>Accedi</button>
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