import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../Utils/routes";
import { users } from '../graphql/queries'
import { remove } from "../graphql/mutations";
import { API } from "aws-amplify";
import { gql } from 'graphql-tag';


const Users = () =>  {

  // const {loading, error, data} = useQuery(gql(users));
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState([]);
  const [err, setErr] = useState();
  
  // async function FetchUsers() {
  //   const {loading, error, data} = useQuery(gql(users));
  //   setLoading(loading);
  //   setError(error);
  //   setData(data);
  // }
  
  // useEffect(() => {
  //   FetchUsers()
  //     .then((item) => {
  //       setData(item);
  //       // console.log(data);
  //     })
  //     .catch((e) => {
  //       setError(e);
  //       // console.log(error);
  //     })
  // }, [])

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
        console.log('Error: ', error);
      })
  }, []);

  async function fetchUsers() {
    const apiData = await API.graphql({ query: gql(users)});
    return apiData;
  }

  const navigate = useNavigate();

  
  console.log('data: ', data);
  console.log('error: ', error);
  console.log('loading: ', loading );
  
  if (loading) return <p>Loading USERS...</p>;
  if (error) return <p>Error :(</p> ;
  
  async function deleteUser() {
    const apiData = await API.graphql({query: gql(remove)});
    return apiData;
  }

  const del = async(userId) => {
    deleteUser({variables: {"id" : userId}}).catch(error => setErr(error));
    window.location.reload()
  }

  const viewPost = (userId) => {
    localStorage.setItem('userId', userId);
    navigate(ROUTES.user);
  }

  return (
    <div><h4>TUTTI GLI UTENTI</h4>
    {err ? alert('Errore nella cancellazione') : ''}
    <Table striped bordered hover variant="dark">
      <thead>
      <tr>
          <th></th>
          <th>ID</th>
          <th>USERNAME</th>
          <th></th>
      </tr>
      </thead>
      {data.data.users.map(user => 
      <tbody key={user.id}>
      <tr> 
          <td><button onClick={() => viewPost(user.id)}>👁</button></td>
          <td>{user.id}</td>
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