import { useQuery, gql } from "@apollo/client"
import '../css/profilo.css';

const ME = gql`
query Me {
    me {
        id
        name
        surname
        age
        username
        password
    }
}`;

const Profilo = () => {

    const {loading, error, data} = useQuery(ME);

    if(loading) return <h1>Loading...</h1>
    if(error) return <h1>Error...</h1>

    return (

        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h2 className="profiloTitle">Profilo utente</h2>
            <div className="profiloContent">
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <h4>{data.me.username}</h4>
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
                            <td className="profiloTD"><b>{data.me.name}</b></td>
                            <td className="profiloTD"><b>{data.me.surname}</b></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

}

export default Profilo