import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import './App.css';

function App() {
  const [ user, setUser ] = useState({});


  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "913173675584-q83qqe6cbhs757i9t2us3k98o9cas68i.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme:"outline", size: "large"}
    );

    google.accounts.id.prompt();
    
  }, []);
   
  return (
    <div className="App">
      <div id="signInDiv"></div>
      { Object.keys(user).length != 0 &&
        <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
      }
      
      { user &&
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
          <h3>{user.email}</h3>
        </div>  

      }
    </div>
  );
}

export default App;
