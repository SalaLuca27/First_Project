import { API } from 'aws-amplify';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';
import '../css/profilo.css';
import { me } from '../graphql/queries';

const Profilo = () => {
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [data, setData] = useState();
    const username = localStorage.getItem('sidebarUsername').toLowerCase();
    const [utente, setUtente ] = useState({});
    console.log(username);

    useEffect(() => {
        fetchMe()
          .then((item) => {
            setData(item);
            setLoading(false);
            console.log('data: ', item);
          })
          .catch((err) => {
            setError(err);
            setLoading(false);
            console.log('Error: ', err);
          })
      }, []);
    
      async function fetchMe() {
        const apiData = await API.graphql({ query: gql(me), variables: {"username": username.toLowerCase()}});
        return apiData;
      }

    if(loading) return <h1>Loading...</h1>
    if(error) return <h1>Error...</h1>

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h2 className="profiloTitle">Profilo utente</h2>
            {data.data.me.map(item => 
            <div className="profiloContent">
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <h4>{item.username}</h4>
                </div>
                <hr className="profiloHR"/>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <table>
                        <thead>
                        <tr>
                            <td className="profiloTDH">Nome</td>
                            <td className="profiloTDH">Cognome</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="profiloTD"><b>{item.name}</b></td>
                            <td className="profiloTD"><b>{item.surname}</b></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            )}
        </div>
    );

}

export default Profilo