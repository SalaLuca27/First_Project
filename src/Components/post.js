import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../Utils/routes";
import '../css/spinner.css';


const POST = gql `
query GetPostById($id: Int!){
  post(id: $id){
    id
    description
    userId{
      id
      name
      surname
    }
  }
}`;

export default function Post(){

  const navigate = useNavigate();

  const id = parseInt(localStorage.getItem('postId'));
  const {loading, error, data} = useQuery(POST, {variables : {"id" : id}})

  if (loading) return <div className="spinner"></div>;
  if (error) return <p>Error :(</p> ;

  const update = () => {
    localStorage.setItem("description", data.post.description);
    localStorage.setItem("userPostId", data.post.userId.id);
    navigate(ROUTES.updatePost)
  }

  return (
    <div><h4>POST BY ID</h4>
      <Table striped bordered hover variant="dark">
        <thead>
        <tr>
          <th></th>
            <th>ID</th>
            <th>DESCRIPTION</th>
            <th>CREATOR NAME</th>
            <th>CREATOR SURNAME</th>
            <th>CREATOR ID</th>
        </tr>
        </thead>      
        <tbody key={data.post.id}>
        <tr> 
            <td><button onClick={() => update()}>✏️</button></td>
            <td>{data.post.id}</td>
            <td>{data.post.description}</td>
            <td>{data.post.userId.name}</td>
            <td>{data.post.userId.surname}</td>
            <td>{data.post.userId.id}</td>
        </tr>
        </tbody>
      </Table>
    </div>
  )
}