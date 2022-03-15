import React from "react";
import { Table } from "react-bootstrap";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../Utils/routes";


const ALLUSERS = gql`
query users{
    users {
    id
    name
    surname
    age
    username
    password
  }
}`;

const DELETE = gql `
mutation Delete($id: Int!) {
  delete(id: $id)
}`;

function Users() {

    const navigate = useNavigate();

    const { loading, error, data } = useQuery(ALLUSERS);

    const [elimina, {err}] = useMutation(DELETE,);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p> ;

    const handleClick = async(userId) => {
      elimina( {variables: {"id" : userId}})
      window.location.reload()
    }

    const viewPost = (userId) => {
      localStorage.setItem('userId', userId);
      navigate(ROUTES.user);
    }
  
    return (
      <div><h4>TUTTI GLI UTENTI</h4>
      {err !== undefined ? <h1>Errore nel rimuovere l'utente</h1> : ""}
      <Table striped bordered hover variant="dark">
        <thead>
        <tr>
            <th></th>
            <th>ID</th>
            <th>USERNAME</th>
            <th></th>
        </tr>
        </thead>
        {data.users.map(user =>
        <tbody key={user.id}>
        <tr> 
            <td><button onClick={() => viewPost(user.id)}>👁</button></td>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td><button onClick={() => handleClick(user.id)}>🗑</button></td>
        </tr>
        </tbody>
        )}
      </Table>
      </div>
    );
  }

export default Users