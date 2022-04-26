import React from "react";
import { Table } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../Utils/routes";
import { users } from '../graphql/queries'

const Users = () =>  {

    const navigate = useNavigate();

    const { loading, error, data } = useQuery(users);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p> ;

    const handleClick = async(userId) => {
      window.location.reload()
    }

    const viewPost = (userId) => {
      localStorage.setItem('userId', userId);
      navigate(ROUTES.user);
    }
  
    return (
      <div><h4>TUTTI GLI UTENTI</h4>
      <Table striped bordered hover variant="dark">
        <thead>
        <tr>
            <th></th>
            <th>ID</th>
            <th>USERNAME</th>
            <th></th>
        </tr>
        </thead>
        {data.items.map(user =>
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

export default Users;