import { ROUTES } from "../Utils/routes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "../graphql/mutations";
import { gql } from 'graphql-tag';
import { API } from "aws-amplify";

const CreateUser = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [age, setAge] = useState();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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

    console.log(parseInt(age));

    async function createUser() {
        
        const apiData = await API.graphql({ query: gql(create), variables: {'name' : name, 'surname': surname, 'age': parseInt(age), 
        'username': username, 'password': password}})
        return apiData;
      }


    const handleClick = (event) => {
        event.preventDefault();
        if(name.trim() === "" || surname.trim() === "" || age.trim() === "" || username.trim() === "" || password.trim() === ""){
            throw window.alert('Compilare tutti i campi');
        }
        createUser()
            .catch((error) => {
                console.log('error: ', error);
            })
            .then((data) => { 
                console.log('data: ', data);
                // navigate(ROUTES.users);
            })
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
                    <input type="number" className="form-control" placeholder="22" name="age" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" placeholder="username" name="username" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="password" name="password" onChange={handleChange} autoComplete = "on"/>
                </div>
                <div className = "buttonContainer">
                    <button className="btn btn-primary" onClick={handleClick}>Crea</button>
                </div>
            </form>
        </div>
    )
}

export default CreateUser;