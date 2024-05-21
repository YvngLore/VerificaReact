import {useState} from 'react';

export default function Login({mostraUtente}){
    const [credenziali, setCredenziali] = useState(false);
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [token, setToken] = useState("");

    async function checkCredenziali(){
        const response = await fetch ("http://localhost:8080/login", 
            {
                method: "POST", 
                header: "Content-Type: application/json",
                body: JSON.stringify({
                    username: user,
                    password: pass
                })
            }
        ); 
        
        const r = await response.json();
        setToken(r.token);

        mostraUtente(token);
    }

    function getUsername(event){
        setUser(event.target.value);
    }

    function getPassword(event){
        setPass(event.target.value);
    }

    return (
        <div>
            {
                credenziali ?
                    <div>
                        <input type='text' onChange={getUsername} placeholder='login' />
                        <input type='password' onChange={getPassword} placeholder='password' />
                        <button onClick={checkCredenziali}> Login </button>
                    </div> 
                : 
                    <button onClick={() => setCredenziali(true)}> Login alla Homepage </button>
            }

            {
                token === "" &&
                    <p> Errore di accesso. Credenziali errate. </p>
            }

            {
                token !== "" &&
                    <p> Sarai reindirizzato alla home. </p>
            }
        </div>
    );
}