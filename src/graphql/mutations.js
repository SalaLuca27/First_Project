/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const login = /* GraphQL */ `
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;
export const create = /* GraphQL */ `
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
export const remove = /* GraphQL */ `
  mutation Remove($id: ID!) {
    remove(id: $id)
  }
`;
export const update = /* GraphQL */ `
  mutation Update($id: ID!, $username: String!) {
    update(id: $id, username: $username)
  }
`;
export const newPost = /* GraphQL */ `
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
export const modifyPost = /* GraphQL */ `
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
export const removePost = /* GraphQL */ `
  mutation RemovePost($id: ID!) {
    removePost(id: $id)
  }
`;
export const createUser = /* GraphQL */ `
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
export const updateUser = /* GraphQL */ `
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
export const deleteUser = /* GraphQL */ `
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
export const createPost = /* GraphQL */ `
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
export const updatePost = /* GraphQL */ `
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
export const deletePost = /* GraphQL */ `
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
