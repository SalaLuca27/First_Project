import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../Utils/routes";
import { users } from '../graphql/queries'
import { remove } from "../graphql/mutations";
import { API } from "aws-amplify";
import { gql } from 'graphql-tag';


const Users = () =>  {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers()
      .then((item) => {
        setData(item);
        setLoading(false);
        console.log('data: ', data);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        console.log('Error: ', err);
      })
  }, []);

  async function fetchUsers() {
    const apiData = await API.graphql({ query: gql(users), authMode: "AMAZON_COGNITO_USER_POOLS"});
    return apiData;
  }

  if (loading) return <p>Loading USERS...</p>;
  if (error) return <p>Error :(</p> ;
  
  async function deleteUser(userId) {
    const delData = await API.graphql({ query: gql(remove), 
      variables: {"id" : userId},
      authMode: "AMAZON_COGNITO_USER_POOLS"});
    return delData;
  }

  const del = async(userId) => {
    await deleteUser(userId)
      .catch((error) => {
        if(error.data != null){
          setErr(true);
        }
        else{
          setErr(false);
        }
        })
        window.location.reload();
  }

  const viewPost = (userId) => {
    localStorage.setItem('userId', userId);
    navigate(ROUTES.user);
  }

  return (
    <div><h4>TUTTI GLI UTENTI</h4>
    {err ? alert('Error while removing user') : ''}
    <Table striped bordered hover variant="dark">
      <thead>
      <tr>
          <th></th>
          <th>NAME</th>
          <th>SURNAME</th>
          <th>USERNAME</th>
          <th></th>
      </tr>
      </thead>
      {data.data.users.map(user => 
      <tbody key={user.id}>
      <tr> 
          <td><button onClick={() => viewPost(user.id)}>👁</button></td>
          <td>{user.name}</td>
          <td>{user.surname}</td>
          <td>{user.username}</td>
          <td><button onClick={() => del(user.id)}>🗑</button></td>
      </tr>
      </tbody>
      )}
    </Table>
    </div>
  );
}

export default Users;