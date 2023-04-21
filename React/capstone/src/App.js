import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AlertMessage from './components/AlertMessage';
import Navbar from './components/NavBar';
import CreateCharacter from './views/CreateCharacter';
//import EditCharacter from './views/EditCharacter';
//import DeleteCharacter from './views/DeleteCharacter.jsx';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
//import SingleCharacter from './views/SingleCharacter';
import Battle from './views/Battle';
//import MyCharacters from './views/MyCharacters';
import "./app.css";

function App() {
    const now = new Date();

    const [loggedIn, setLoggedIn] = useState((localStorage.getItem('token') && new Date(localStorage.getItem('tokenExp')) > now) || false);
    const [message, setMessage] = useState(null);
    const [category, setCategory] = useState(null);

    function flashMessage(message, category){
        setMessage(message);
        setCategory(category);
    };


    function logUserOut(){
        setLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExp');
        flashMessage('You have logged out', 'primary')
    };

    return (
        <div className="App">
            <Navbar loggedIn={loggedIn} logUserOut={logUserOut} />
            {message ? <AlertMessage message={message} category={category} flashMessage={flashMessage} /> : null}
            <div className='container'>
                <Routes>
                    <Route path='/' element={<Home loggedIn={loggedIn} logUserOut={logUserOut}/>} /> 
                    <Route path='/register' element={<Register flashMessage={flashMessage} />} />
                    <Route path='/login' element={<Login flashMessage={flashMessage} logUserIn={setLoggedIn} />} />
                    <Route path='/create' element={<CreateCharacter flashMessage={flashMessage} loggedIn={loggedIn} />} />
                    <Route path='/battle' element={<Battle/>} />
                    {/* <Route path='/characters' element={<MyCharacters flashMessage={flashMessage} loggedIn={loggedIn} />} />
                    <Route path='/characters/:characterId/edit' element={<EditCharacter flashMessage={flashMessage} loggedIn={loggedIn} />} />
                    <Route path='/characters/:characterId/delete' element={<DeleteCharacter flashMessage={flashMessage} loggedIn={loggedIn} />} /> 
                    <Route path='/characters/:characterId' element={<SingleCharacter loggedIn={loggedIn} />} />*/}
                </Routes>
                
            </div>
        </div>
    );
}
  

export default App;