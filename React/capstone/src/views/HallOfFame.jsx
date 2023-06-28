import React, {useState, useEffect} from 'react'
import PuffLoader from "react-spinners/PuffLoader";


export default function HallOfFame() {
    const [hofList, setHofList] = useState(null);
    const [loader, setLoader] = useState(false);
    const [champion, setChampion] = useState({});


  //  useEffect(() => {
  //     setLoader(true);
  //     const fetchData = (fetch(`http://127.0.0.1:5000/api/hof`)
  //           .then(res => res.json())
  //           .then(data => {
  //               console.log(data);
  //               setHofList(data);
  //               setStaticVar2(false);
  //            return fetch(`http://127.0.0.1:5000/api/characters/${hofList[1]['id']}`)   
  //           }))
  //      fetchData.then(r => r.json())
  //         .then(data => {
  //           console.log(data);
  //           setChampion(data);
  //           setLoader(false);
  //           setStaticVar(false);
  //           })
  //   },[staticVar, staticVar2])

useEffect(() => {
    (async function() {
       setLoader(true)
       const hofData = await fetch(`http://127.0.0.1:5000/api/hof`)
         .then(resp => resp.json());
       const championData = await fetch(`http://127.0.0.1:5000/api/characters/${hofData[1]['id']}`)
       .then(resp => resp.json());
      console.log(hofData);
       setHofList(hofData);
       setChampion(championData);
       setLoader(false);
    })();

 },[])

    // useEffect(()=>{
  
    //     if (champion){
    //       const caption = champion.name + " the " + champion.description;
    //       const captionLoc = caption.indexOf("in the style");
    //       setCaptionEdit(caption.substring(0, captionLoc));
      
    //     }
    //   }, [champion]);


function changeHero(heroId) {
    setLoader(true)
    fetch(`http://127.0.0.1:5000/api/characters/${heroId}`)
    .then(resp => resp.json())
    .then((clickedChamp)=>{
    setChampion(clickedChamp);
    setLoader(false);
});

}




  return (
    <div>
    {loader?
       
       <>
        <h2 className='LoadingText'>Hero Being Summoned!</h2>
        
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
      <div className="row">
      
      <div className="frame frameHof">
      <img src={champion.link} className="hofImg"></img>
      </div>
        {(hofList)&&
        <table className="hofList">
          <tr>
            <th>Champion
            </th>
            <th>Wins
            </th>
          </tr>

          

            {Object.entries(hofList).map(([hofID,hofItem])=> 
              <tr>
                  <td href="#" onClick={()=>changeHero(hofItem.id)}>{hofItem.name}</td>
                  <td>{hofItem.wins}</td>
              </tr>
              
              )}
         
        
            


     </table>
}
      </div>
      <div className='row'>
        <div className="homeCard">
            
 
                <h3>Hero</h3>
               
                <h3 className="card-title">{champion.name}</h3>  
                
        </div>
        </div>
        </>
    }
    </div>

        


  )
}
