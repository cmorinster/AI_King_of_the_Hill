import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
    const [champion, setChampion] = useState({});
    let champCurrent = localStorage.getItem('champId');
    useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/characters/${champCurrent}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setChampion(data);
            })
    }, [champCurrent])

    




  return (
    <div>
      <h1>Welcome to the AI Art King of the Hill</h1>
      
        <div className="card">
          <img src={champion.link}></img>
                <div className="card-body">  
                  <h3>Current Champion:</h3>
                  <h3 className="card-title">{champion.name}</h3>  
                </div>
                  <h1 className="card-title beatThem">Think You Can Beat Them?</h1>  
                <div className="row">
                <div className="col">
                <Link className='btn btn-primary left homeButton' to={`/register`}>Register</Link>
                </div>
                <div className="col">
                <Link className='btn btn-primary right homeButton' to={`/login`}>Login</Link>
                </div>
                </div>
        </div>


    </div>
  )
}
