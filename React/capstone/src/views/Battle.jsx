import React, {useState, useEffect} from 'react'

export default function Battle() {
    const [challenger, setChallenger] = useState({});
    const [champion, setChampion] = useState({});
    const [winner, setWinner] = useState({});
    let champCurrent = localStorage.getItem('champId');
    let characterCurrent = localStorage.getItem('charId');
    useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/characters/${characterCurrent}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setChallenger(data);
            })
    }, [characterCurrent])
    
    useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/characters/${champCurrent}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setChampion(data);
            })
    }, [characterCurrent])

    async function handleSubmit(e){ 
        e.preventDefault();
        let challengerTotal = (challenger.strength + challenger.agility + challenger.speed +challenger.camoflague + challenger.endurance + challenger.intellegence)/12;
        let championTotal = (champion.strength + champion.agility + champion.speed +champion.camoflague + champion.endurance + champion.intellegence)/12;
        let championHP = champion.health*15;
        let challengerHP = challenger.health*15;
        while (championHP > 0 && challengerHP > 0){
            let challengerRoll = getRandomInt(1, 5);
            let championRoll = getRandomInt(1, 5);
            championHP -= challengerTotal*challengerRoll;
            challengerHP -= championTotal*championRoll;
            console.log(challengerHP)
            console.log(championHP)
        }
        if (challengerHP > championHP){
            localStorage.setItem('champId', challenger.id)
            setWinner('challenger')
        } else {
            setWinner('champion')
        }
        
    } 
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min)
    
    }
  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
        <div className="row">
            <div className="col-6">
                <div className="card mt-5">
                    <img src={challenger.link}></img>
                    <div className="card-body">
                        <h5 className="card-title">{challenger.name}</h5>
                        <p className='card-text stats'>Strength: {challenger.strength}</p>
                        <p className='card-text stats'>Speed: {challenger.speed}</p>
                        <p className='card-text stats'>Agility: {challenger.agility}</p>
                        <p className='card-text stats'>Endurance: {challenger.endurance}</p>
                        <p className='card-text stats'>Camoflague: {challenger.camoflague}</p>
                        <p className='card-text stats'>Intellegence: {challenger.intellegence}</p>
                        <p className='card-text stats'>Health: {challenger.health}</p>
                        
                    </div>
                </div>
                        {winner=='challenger' && 
                        <h4>Winner!</h4>
                        }
                
                
                </div>
            <div className="col-6">
            <div className="card mt-5">
                    <img src={champion.link}></img>
                    <div className="card-body">
                        <h5 className="card-title">{champion.name}</h5>
                        <p className='card-text stats'>Strength: {champion.strength}</p>
                        <p className='card-text stats'>Speed: {champion.speed}</p>
                        <p className='card-text stats'>Agility: {champion.agility}</p>
                        <p className='card-text stats'>Endurance: {champion.endurance}</p>
                        <p className='card-text stats'>Camoflague: {champion.camoflague}</p>
                        <p className='card-text stats'>Intellegence: {champion.intellegence}</p>
                        <p className='card-text stats'>Health: {champion.health}</p>     
                    </div>     
                </div>
                        {winner=='champion' && 
                        <h4>Winner!</h4>
                        }
            </div>
        </div>
        {(winner!= 'challenger' && winner!= 'champion') &&
        <button type="submit" className="btn btn-danger mb-3 battleButton">Fight</button>
        }   
        </form>
    </div>
  )
}
