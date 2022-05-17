import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../Utils/routes";
import '../css/spinner.css';


const POSTS = gql `
query GetAllPosts {
  posts {
    id
    description
    userId {
      id
      name
      surname
    }
  }
}`;

const DELETE = gql `
mutation RemovePost($id: Int!) {
  removePost(id: $id)
}`;

export default function Posts() {

  const navigate = useNavigate();

  const { loading, error, data } = useQuery(POSTS);

  const [elimina, {err}] = useMutation(DELETE);

  if (loading) return <div className="spinner"></div>;
  if (error) return <p>Error :(</p> ;

  const handleClick = async(postId) => {
    elimina({variables: {"id" : postId}})
    window.location.reload()
  }

  const viewPost = (postId) => {
    localStorage.setItem('postId', postId);
    navigate(ROUTES.post);
  }
  
  return (
    <div><h4>TUTTI I POST</h4>
    {err !== undefined ? <h1>Errore nel rimuovere il post</h1> : ""}
    <Table striped bordered hover variant="dark">
      <thead>
      <tr>
          <th></th>
          <th>ID</th>
          <th>DESCRIPTION</th>
          <th></th>
      </tr>
      </thead>
      {data.posts.map(post =>
      <tbody key={post.id}>
      <tr>
          <td><button onClick={() => viewPost(post.id)}>👁</button></td>
          <td>{post.id}</td>
          <td>{post.description}</td>
          <td><button onClick={() => handleClick(post.id)}>🗑</button></td>
      </tr>
      </tbody>
      )}
    </Table>
    </div>
  );
}