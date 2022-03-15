import { ROUTES } from "../Utils/routes";
import { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const UpdateUser = () => {

    const navigate = useNavigate();
    const id = localStorage.getItem("userId")
    const [username, setUsername] = useState(localStorage.getItem("username"));

    const UPDATE = gql`
    mutation Update($id: Int!, $username: String!) {
        update(id: $id, username: $username) {
            id
            name
            surname
            age
            username
            password
        }
    }`;


    const handleChange = (event) => {
        if(event.target.name === 'username'){
            setUsername(event.target.value);
        }
    }

    const [update, {error}] = useMutation(UPDATE)

    const handleClick = (event) => {
        event.preventDefault();
        update({variables: {'id' : parseInt(id), 'username': username}})
        if(!error) {
            localStorage.setItem('username', '');
            navigate(ROUTES.user);
            window.location.reload();
        }
    }

    return (

        <div className="form">
            <form>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" name="username" value = {username} onChange={handleChange}/>
                </div>
                <div className = "buttonContainer">
                    <button className="btn btn-primary" onClick={handleClick}>Update</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateUser;