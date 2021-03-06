/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const users = /* GraphQL */ `
  query Users {
    users {
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
          owner
          userPostsId
          author
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const user = /* GraphQL */ `
  query User($id: ID!) {
    user(id: $id) {
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
          owner
          userPostsId
          author
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const me = /* GraphQL */ `
  query Me($username: ID!) {
    me(username: $username) {
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
          owner
          userPostsId
          author
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const posts = /* GraphQL */ `
  query Posts {
    posts {
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
        owner
      }
      createdAt
      updatedAt
      owner
      userPostsId
      author
    }
  }
`;
export const post = /* GraphQL */ `
  query Post($id: ID!) {
    post(id: $id) {
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
        owner
      }
      createdAt
      updatedAt
      owner
      userPostsId
      author
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
          owner
          userPostsId
          author
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        owner
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
        owner
      }
      createdAt
      updatedAt
      owner
      userPostsId
      author
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        userId {
          id
          name
          surname
          age
          username
          password
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        owner
        userPostsId
        author
      }
      nextToken
    }
  }
`;
