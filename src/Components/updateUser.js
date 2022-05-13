import { ROUTES } from "../Utils/routes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "aws-amplify";
import { gql } from 'graphql-tag';
import { update } from "../graphql/mutations";

const UpdateUser = () => {

    const navigate = useNavigate();
    // const id = localStorage.getItem("userId")
    const [username, setUsername] = useState(localStorage.getItem("username"));

    const handleChange = (event) => {
        if(event.target.name === 'username'){
            setUsername(event.target.value);
        }
    }

    async function updateUser() {
        const apiData = await API.graphql({ query: gql(update), 
            variables: { "id":  localStorage.getItem("userId"), "username": username.toLowerCase()},
            authMode: "AMAZON_COGNITO_USER_POOLS" });
        return apiData;
      }

    const handleClick = (event) => {
        event.preventDefault();
        updateUser()
            .then((data) => {
                if(data){
                    localStorage.setItem('username', '');
                    localStorage.setItem('sidebarUsername', username.toLowerCase())
                    navigate(ROUTES.user);
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.log('Errore modifica: ', err);
                alert('You are not allow to update this user');
            })
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