import React from "react";
import { gql, useSubscription } from "@apollo/client";
import { Table } from "react-bootstrap";

const POST_SUBSCRIPTION = gql `
subscription postCreated {
  postCreated {
    id
    description
    userId {
      name
      surname
    }
  }}`;


export default function SubPost(){
  const {loading, error, data} = useSubscription(POST_SUBSCRIPTION)

  if(loading) return <p>Loading Post...</p>;
  if(error) return <p>Error :(</p>;

  return (
    <div><h4>SUBSCRIPTION</h4>
        <Table striped bordered hover variant="dark">
          <thead>
          <tr>
              <th>ID</th>
              <th>DESCRIPTION</th>
              <th>CREATOR NAME</th>
              <th>CREATOR SURNAME</th>
              <th>CREATOR ID</th>
          </tr>
          </thead>      
          <tbody key={data.postCreated.id}>
          <tr> 
          <td>{data.postCreated.id}</td>
              <td>{data.postCreated.description}</td>
              <td>{data.postCreated.userId.name}</td>
              <td>{data.postCreated.userId.surname}</td>
              <td>{data.postCreated.userId.id}</td>
          </tr>
          </tbody>
        </Table>
    </div>
  )
}