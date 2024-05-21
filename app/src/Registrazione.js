import {useState} from 'react';

export default function Registrazione(){
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [mail, setMail] = useState("");
    const [status, setStatus] = useState(false);
    const [richiestaRegistrazione, setRichiestaRegistrazione] = useState(false);

    function registrazione(){
        setRichiestaRegistrazione(true);
    }

    function getUsername(event){
        setUser(event.target.value);
    }
    function getPassword(event){
        setPass(event.target.value);
    }
    function getEmail(event){
        setMail(event.target.value);
    }

    async function checkRegistrazione(){
        const response = await fetch("http://localhost:8080/signup",
            {
                method: "POST",
                header: "Content-Type: application/json",
                body: JSON.stringify({
                    username: user,
                    password: pass, 
                    email: mail
                })
            }
        ); 

        const result = await response.json();
        setStatus(result.status);
    }

    return(
        <div>
            {
                richiestaRegistrazione ?
                    <div>
                        <input type='text' onChange={getUsername} placeholder='Username' /> <br />
                        <input type='email' onChange={getEmail} placeholder='Email' /> <br />
                        <input type='password' onChange={getPassword} placeholder='Password' /> <br />
                        <button onClick={checkRegistrazione}> Registrati </button>
                    </div>
                
                :
                    <button onClick={registrazione}> Registrati alla Homepage </button>
            }
            
            {
                status &&
                    <p> Registrazione andata a buon fine, puoi effettuare il Login. </p>
            }

            {
                !status &&
                    <p> Errore di registrazione. </p>
            }
        </div>
    )
}