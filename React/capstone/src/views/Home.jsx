import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import PuffLoader from "react-spinners/PuffLoader";

export default function Home() {
    const [champion, setChampion] = useState({});
    const [loader, setLoader] = useState(false);
   
    useEffect(() => {
      setLoader(true);
      fetch(`http://127.0.0.1:5000/api/champ`)
          .then(res => res.json())
          .then(data => {
              console.log(data);
              setChampion(data);
              setLoader(false)
          })
  }, [])
    

  //   let myHeaders = new Headers();  issue is that we need to either look at the image once we get it and react if its bad or react when the image is bad upon its fetch
  //   myHeaders.append('Content-Type', 'application/json');
  //   let formData = JSON.stringify({
  //     champion: false
  // })

  // fetch(`http://127.0.0.1:5000/api/characters/16`, {
  //     method: 'PUT',
  //     headers: myHeaders,
  //     body: formData
  // })



  return (
    
      <div>
        
      <h1>Welcome to the AI Art King of the Hill</h1>
      {loader?
        <>
        <h2 className='LoadingText'>Current Champ is Being Summoned!</h2>
        
        <PuffLoader
        className='loader'
        color={"#ffffff"}
        loading={loader}
        size={150}
        aria-label="Puff Loader"
        data-testid="loader"
      />
        </>

      :
        <div className="card homeCard">
          <img src={champion.link} className="homeImg"></img>
                <div className="card-body">  
                  <h3>Current Champion:</h3>
                  <h3 className="card-title">{champion.name}</h3>  
                </div>
                  <h2 className="card-title beatThem">{champion.name} says you smell bad! Think You Can Beat Them?</h2>  
                <div className="row">
                <div className="col">
                <Link className='btn btn-primary left homeButton' to={`/register`}>Register</Link>
                </div>
                <div className="col">
                <Link className='btn btn-primary right homeButton' to={`/login`}>Login</Link>
                </div>
                </div>
          </div>

          }


    </div>

    
  )
}
