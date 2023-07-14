import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import PuffLoader from "react-spinners/PuffLoader";

export default function Home() {
    const [champion, setChampion] = useState({});
    const [loader, setLoader] = useState(false);
    const [captionEdit, setCaptionEdit] = useState(null);
   
    useEffect(() => {
      setLoader(true);
      fetch(`http://3.23.92.242/api/champ`)
          .then(res => res.json())
          .then(data => {
              console.log(data);
              setChampion(data);
              setLoader(false);

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
  useEffect(()=>{
  
  if (champion){
    const caption = champion.name + " the " + champion.description;
    const captionLoc = caption.indexOf("in the style");
    setCaptionEdit(caption.substring(0, captionLoc));

  }
}, [champion]);

  return (
    
      <div>
        
      <h1>AI Art King of the Hill</h1>
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
      <>
      
        <div className='row'>
        
          <div className='frame'>
          
              <img src={champion.link} className="homeImg"></img>
          </div>
          <div className='HomeButtons'>
            <Link className='btn btn-primary left homeButton' to={`/register`}>Register</Link>
            <Link className='btn btn-primary right homeButton' to={`/login`}>Login</Link>
            <Link className='btn btn-primary right homeButton' to={`/hof`}>Hall of Fame</Link>
          </div>
        </div>
     

        <div className='row'>
            <div className="homeCard">
                
                    {/* <img src={imageToAdd}></img> */}
                    <h3>Champion</h3>
                    {captionEdit&&
                    
                    <h3 className="card-title">{captionEdit}</h3>  
                    }
            </div>
        </div>
          </>
          }


    </div>
    

    
  )
}
