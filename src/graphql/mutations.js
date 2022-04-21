/* eslint-disable */
// this is an auto generated file. This will be overwritten
import { gql } from "apollo-boost";

export const login = gql `
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;
export const create = gql `
  mutation Create(
    $name: String!
    $surname: String!
    $age: Int!
    $username: String!
    $password: String!
  ) {
    create(
      name: $name
      surname: $surname
      age: $age
      username: $username
      password: $password
    ) {
      id
      name
      surname
      age
      username
      password
      posts {
        items {
          id
          description
          createdAt
          updatedAt
          userPostsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const remove = gql `
  mutation Remove($id: ID!) {
    remove(id: $id)
  }
`;
export const update = gql `
  mutation Update($id: ID!, $username: String!) {
    update(id: $id, username: $username) {
      id
      name
      surname
      age
      username
      password
      posts {
        items {
          id
          description
          createdAt
          updatedAt
          userPostsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const newPost = gql `
  mutation NewPost($description: String!) {
    newPost(description: $description) {
      id
      description
      userId {
        id
        name
        surname
        age
        username
        password
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      userPostsId
    }
  }
`;
export const modifyPost = gql `
  mutation ModifyPost($id: ID!, $description: String!, $userId: ID!) {
    modifyPost(id: $id, description: $description, userId: $userId) {
      id
      description
      userId {
        id
        name
        surname
        age
        username
        password
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      userPostsId
    }
  }
`;
export const removePost = gql `
  mutation RemovePost($id: ID!) {
    removePost(id: $id)
  }
`;
export const createUser = gql `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      surname
      age
      username
      password
      posts {
        items {
          id
          description
          createdAt
          updatedAt
          userPostsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = gql `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      surname
      age
      username
      password
      posts {
        items {
          id
          description
          createdAt
          updatedAt
          userPostsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = gql `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      surname
      age
      username
      password
      posts {
        items {
          id
          description
          createdAt
          updatedAt
          userPostsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createPost = gql `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      description
      userId {
        id
        name
        surname
        age
        username
        password
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      userPostsId
    }
  }
`;
export const updatePost = gql `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      description
      userId {
        id
        name
        surname
        age
        username
        password
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      userPostsId
    }
  }
`;
export const deletePost = gql `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      description
      userId {
        id
        name
        surname
        age
        username
        password
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      userPostsId
    }
  }
`;
