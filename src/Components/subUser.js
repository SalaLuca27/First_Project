import React from "react";
import { gql, useSubscription } from "@apollo/client";
import { Table } from "react-bootstrap";

const USER_SUBSCRIPTION = gql `
subscription UserCreated {
  userCreated {
    id
    name
    surname
    age
    username
    password
  }}`;


export default function SubUser(){
  const {loading, error, data} = useSubscription(USER_SUBSCRIPTION)

  if(loading) return <p>Loading User...</p>;
  if(error) return <p>Error :(</p>;

  return (<div><h4>SUBSCRIPTION</h4>
  <Table striped bordered hover variant="dark">
    <thead>
    <tr>
        <th>ID</th>
        <th>NAME</th>
        <th>SURNAME</th>
        <th>USERNAME</th>
        <th>AGE</th>
    </tr>
    </thead>
    <tbody key={data.userCreated.id}>
    <tr> 
        <td>{data.userCreated.id}</td>
        <td>{data.userCreated.name}</td>
        <td>{data.userCreated.surname}</td>
        <td>{data.userCreated.username}</td>
        <td>{data.userCreated.age}</td>
    </tr>
    </tbody>
  </Table>
  </div>
  )
}