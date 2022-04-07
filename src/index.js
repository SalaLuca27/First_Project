import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink } from "@apollo/client";
import { split } from 'apollo-boost';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getMainDefinition } from 'apollo-link-ws/node_modules/apollo-utilities';
import AppRoutes from './Routes';
import { Provider } from 'react-redux';
import {store} from './Store/applicationStore';
import ReactDOM from 'react-dom';
import awsconfig from '../src/aws-exports'
import Amplify from 'aws-amplify';
Amplify.configure(awsconfig);

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />

//RIMUOVERE TUTTE LE PARTI DI COLLEGAMENTO CON IL BACK-END POICHE' TUTTO PRESENTE SU AWS
//MANTENERE LA LOGIN E LA REGISTER GIA' CREATI UTILIZZANDO LE VARIE FUNZIONI DELL'OGGETTO DI AMPLIFY Auth
//CREARE E VALORIZZARE I CAMPI DI DYNAMODB CON UTENTI E POST GIA' PRESENTI IN LOCALE
//CAPIRE COME RITORNARE USERNAME E EMAIL DELL'UTENTE NELLA PROFILE PAGE
//MODIFICARE LA LOGOUT SETTANDO L'AZIONE DI AMPLIFY Auth.logout(SE PRESENTE)


const httpLink = new HttpLink({ uri: 'http://localhost:5001/graphql'});

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


const link = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (definition.kind === 'OperationDefinition' && definition.operation === 'subscription');
  },
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