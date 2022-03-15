import { ROUTES } from "../Utils/routes";
import { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const UpdatePost = () => {

    const navigate = useNavigate();
    const id = localStorage.getItem("postId");
    const userId = localStorage.getItem("userPostId");
    const [description, setDescription] = useState(localStorage.getItem("description"));

    const UPDATE = gql`
    mutation UpdatePost($id: Int!, $description: String!, $userId: Int!) {
        updatePost(id: $id, description: $description, userId: $userId) {
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

    const [update, {error}] = useMutation(UPDATE)

    const handleClick = (event) => {
        event.preventDefault();
        update({variables: {'id' : parseInt(id), 'description': description, 'userId': parseInt(userId)}})
        if(!error) {
            localStorage.setItem("description", "");
            localStorage.setItem("userPostId", "");
            navigate(ROUTES.post);
            window.location.reload();
        }
    }

    return (

        <div className="form">
            <form>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input type="text" className="form-control" name="description" value={description} onChange={handleChange}/>
                </div>
                <div className = "buttonContainer">
                    <button className="btn btn-primary" onClick={handleClick}>Update</button>
                </div>
            </form>
        </div>
    )
}

export default UpdatePost;