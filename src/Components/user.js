import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../Utils/routes";

const USER = gql `
query GetUserById($id: Int!) {
  user(id: $id) {
    id
    name
    surname
    age
    username
    password
  }
}`;

export default function User() {
  
  const navigate = useNavigate();

  const id = parseInt(localStorage.getItem('userId'));
  const {loading, error, data} = useQuery(USER, {variables: {"id": id}})

  if(loading) return <p>Loading...</p>;
  if(error) return <p>Error...</p>;

  const update = () => {
    localStorage.setItem('username', data.user.username);
    navigate(ROUTES.updateUser)
  }

  return (
    <div><h4>UTENTE BY ID</h4>
    <Table striped bordered hover variant="dark">
      <thead>
      <tr>
          <th></th>
          <th>ID</th>
          <th>NAME</th>
          <th>SURNAME</th>
          <th>USERNAME</th>
          <th>AGE</th>
      </tr>
      </thead>      
      <tbody key={data.user.id}>
      <tr> 
          <td><button onClick={() => update()}>✏️</button></td>
          <td>{data.user.id}</td>
          <td>{data.user.name}</td>
          <td>{data.user.surname}</td>
          <td>{data.user.username}</td>
          <td>{data.user.age}</td>
      </tr>
      </tbody>
    </Table>
    </div>
  )
}