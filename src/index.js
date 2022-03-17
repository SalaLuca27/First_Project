import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink } from "@apollo/client";
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-boost';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getMainDefinition } from 'apollo-link-ws/node_modules/apollo-utilities';
import AppRoutes from './Routes';
import { Provider } from 'react-redux';
import {store} from './Store/applicationStore';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />

const httpLink = new HttpLink({ uri: 'http://localhost:5000/graphql' });

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem("token");

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? token : '',
    }
  });
  
  // Call the next link in the middleware chain.
  return forward(operation);
});

const wsLink = new WebSocketLink({
  uri:'ws://localhost:5000/graphql',
  options: {
    reconnect: true,
  }
})

const link = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (definition.kind === 'OperationDefinition' && definition.operation === 'subscription');
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link),
});


function App() {
  return (
    <div>
      <Provider store={store}>
          <AppRoutes />
      </Provider>
    </div>
  );
}

ReactDOM.render(

  <ApolloProvider client={client}>
      <App />
  </ApolloProvider>,
  document.getElementById('root'),
);


export default App