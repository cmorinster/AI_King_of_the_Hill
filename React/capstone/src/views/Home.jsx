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
      <h1>Welcome to the AI King of the Hill</h1>
        <div className="card"><img src={champion.link}></img>
                <div className="card-body">
                        <h2>Current Champion:</h2>
                        <h5 className="card-title">{champion.name}</h5>
                </div>
                <Link className='btn btn-primary' to={`/register`}>Register</Link>
                <Link className='btn btn-primary' to={`/login`}>Login</Link>
                
        </div>


    </div>
  )
}
