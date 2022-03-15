import { ROUTES } from "../Utils/routes";
import { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {

    const navigate = useNavigate();
    const [description, setDescription] = useState("");
    const [errore, setErrore] = useState(false);

    const CREATE = gql`
        mutation CreatePost ($description: String!){
        createPost(description: $description) {
            id
            description
            userId {
            name
            surname
            }
        }
    }`;


    const handleChange = (event) => {
        if(event.target.name === 'description'){
            setDescription(event.target.value);
        }
    }

    const [createPost, {error}] = useMutation(CREATE,{variables: {'description' : description}})

    const handleClick = (event) => {
        event.preventDefault();
        if(description.trim() === ""){
            throw setErrore(true);
        }
        createPost();
        if(!error || error !== undefined) {
            navigate(ROUTES.posts);
            window.location.reload();
        }
    }

    return (

        <div className="form">
            <form>
                {errore ? <h4>Compilare il campo description del post</h4> : ""}
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input type="text" className="form-control" placeholder="description" name="description" onChange={handleChange}/>
                </div>
                <div className = "buttonContainer">
                    <button className="btn btn-primary" onClick={handleClick}>Crea</button>
                </div>
            </form>
        </div>
    )
}

export default CreateUser;