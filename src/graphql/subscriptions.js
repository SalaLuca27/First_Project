/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const postCreated = /* GraphQL */ `
  subscription PostCreated {
    postCreated {
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
export const postUpdated = /* GraphQL */ `
  subscription PostUpdated {
    postUpdated {
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
export const postDeleted = /* GraphQL */ `
  subscription PostDeleted {
    postDeleted {
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
export const userCreated = /* GraphQL */ `
  subscription UserCreated {
    userCreated {
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
export const userUpdated = /* GraphQL */ `
  subscription UserUpdated {
    userUpdated {
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
export const userDeleted = /* GraphQL */ `
  subscription UserDeleted {
    userDeleted {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String) {
    onCreateUser(owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String) {
    onUpdateUser(owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String) {
    onDeleteUser(owner: $owner) {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($author: String) {
    onCreatePost(author: $author) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($author: String) {
    onUpdatePost(author: $author) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($author: String) {
    onDeletePost(author: $author) {
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
