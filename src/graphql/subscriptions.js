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
      }
      createdAt
      updatedAt
      userPostsId
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
      }
      createdAt
      updatedAt
      userPostsId
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
      }
      createdAt
      updatedAt
      userPostsId
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
          userPostsId
        }
        nextToken
      }
      createdAt
      updatedAt
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
          userPostsId
        }
        nextToken
      }
      createdAt
      updatedAt
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
          userPostsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
