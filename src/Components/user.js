import React, { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../Utils/routes";
import { user } from "../graphql/queries";
import { API } from "aws-amplify";

export default function User() {
  
  const id = localStorage.getItem('userId');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState([]);
  const [err, setErr] = useState();

  async function fetchUser(id) {
    const apiData = await API.graphql({ query: gql(user), variables: { "id":  id}});
    console.log(apiData);
    return apiData;
  }
  
  useEffect(() => {
      fetchUser(id)
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

  if(loading) return <p>Loading...</p>;
  if(error) return <p>Error :(</p>;

  const update = () => {
    localStorage.setItem('username', data.Item.username);
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
      <tbody key={data.data.user.id}>
      <tr> 
          <td><button onClick={() => update()}>✏️</button></td>
          <td>{data.data.user.id}</td>
          <td>{data.data.user.name}</td>
          <td>{data.data.user.surname}</td>
          <td>{data.data.user.username}</td>
          <td>{data.data.user.age}</td>
      </tr>
      </tbody>
    </Table>
    </div>
  )
}