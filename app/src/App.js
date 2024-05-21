import Login from './Login';
import './App.css';
import {useState} from 'react';
import Registrazione from './Registrazione';

function App() {
  const [mostraLogin, setMostraLogin] = useState(false);
  const [mostraRegistrazione, setMostraRegistrazione] = useState(false);
  const [utente, setUtente] = useState({});
  const [mostraUtente, setMostraUtente] = useState(false);


  async function showUtente(){
    const response = await fetch(`http://localhost:8080/user/`, {method: "GET"}); 
    setUtente(await response.json());
    setMostraUtente(true);
  }

  return (
    <div className="App">
      <h1> Autenticazione Utente </h1>

      <button onClick={() => setMostraLogin(true)}> Login </button>
      {
        mostraLogin ? 
          <Login mostraUtente={showUtente} />
        
        : 
          <div> Loading... </div>
      }

      <button onClick={() => setMostraRegistrazione(true)}> Registrati </button>
      {
        mostraRegistrazione ? 
          <Registrazione />

        : 
          <div> Loading... </div>
      }

      { 
        mostraUtente && 
          <table>
            <th>
              <td> ID </td>
              <td> Email</td>
              <td> Username </td>
              <td> Token </td>
            </th>
            <tr>
              <td> ${utente.id} </td>
              <td> ${utente.email} </td>
              <td> ${utente.username} </td>
              <td> ${utente.token} </td>
            </tr>
          </table>
      }
    </div>
  );
}

export default App;
