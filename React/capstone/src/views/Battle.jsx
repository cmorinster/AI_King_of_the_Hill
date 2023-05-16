import React, {useState, useEffect} from 'react'

export default function Battle() {
    const [challenger, setChallenger] = useState({});
    const [champ, setchamp] = useState({});
    const [champDamage, setchampDamage] = useState(40);
    const [challDamage, setchallDamage] = useState(40);
    const [champHealth, setchampHealth] = useState(30);
    const [challHealth, setchallHealth] = useState(30);
    const [buttonChecker, setbuttonChecker] = useState(true);
    const [winner, setWinner] = useState({});
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
        fetch(`http://127.0.0.1:5000/api/champ`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setchamp(data);
            })
    }, [characterCurrent])
    
    const delay = ms => new Promise(res => setTimeout(res, ms));
    async function handleSubmit(e){ 
        e.preventDefault();
        setbuttonChecker(false);
        let challengerTotal = (challenger.strength + challenger.agility + challenger.speed +challenger.camoflague + challenger.endurance + challenger.intellegence)/6;
        let champTotal = (champ.strength + champ.agility + champ.speed +champ.camoflague + champ.endurance + champ.intellegence)/6;
        let champHP = champ.health;
        let challengerHP = challenger.health;
        setchallHealth(challengerHP);
        setchampHealth(champHP);
        while (champHP > 0 && challengerHP > 0){
            await delay(1000);
            let challengerRoll = getRandomInt(1, challengerTotal/2);
            let champRoll = getRandomInt(1, champTotal/2);
            setchallDamage(challengerRoll);
            setchampDamage(champRoll);
            champHP -= challengerRoll;
            challengerHP -= champRoll;
            setchallHealth(challengerHP);
            setchampHealth(champHP);
            console.log(challengerHP)
            console.log(champHP)
        }
        //Tell me a fictional story in 150 words or less of how Gordy the Gorilla a Gorilla with a Jetpack defeated Draco the Magnificent a Dragon catching fireflies in battle.
        if (challengerHP > champHP){
            localStorage.setItem('champId', challenger.id)
            setWinner('challenger')
            handleWinner('challenger')
        } else {
            setWinner('champion')
            handleWinner('champion')
        }
        
    } 
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min)
    
    }

    async function handleWinner(gg){
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        console.log(gg)
        if (gg == 'champion') {
            let formData = JSON.stringify({
                wins: champ.wins + 1
            })

            fetch(`http://127.0.0.1:5000/api/characters/${champ.id}`, {
                method: 'PUT',
                headers: myHeaders,
                body: formData
            })
            
        } else {
            let formData = JSON.stringify({
                wins: 1,
                champion: true
            })

            fetch(`http://127.0.0.1:5000/api/characters/${challenger.id}`, {
                method: 'PUT',
                headers: myHeaders,
                body: formData
            })

            let formData2 = JSON.stringify({
                champion: false
            })

            fetch(`http://127.0.0.1:5000/api/characters/${champ.id}`, {
                method: 'PUT',
                headers: myHeaders,
                body: formData2
            })
        }

    }

  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
        <div className="row">
            <div className="col-6">
                <div className="card mt-5">
                    <img className="overlayImg" src={challenger.link}></img>
                    {((winner!= 'challenger' && winner!= 'champion')&&(challDamage!=40)) && 
                        <p className='damage'>- {challDamage}</p>
                        }
                         {((winner == 'challenger')) && 
                        <p className='winner'>Winner!</p>
                        }
                     {((winner == 'champion')) && 
                        <p className='damage_lose'>Defeated</p>
                        }
                    <div className="card-body">
                        <h5 className="card-title">{challenger.name}</h5>
                        <p className='card-text stats'>Strength: {challenger.strength}</p>
                        <p className='card-text stats'>Speed: {challenger.speed}</p>
                        <p className='card-text stats'>Agility: {challenger.agility}</p>
                        <p className='card-text stats'>Endurance: {challenger.endurance}</p>
                        <p className='card-text stats'>Camoflague: {challenger.camoflague}</p>
                        <p className='card-text stats'>Intellegence: {challenger.intellegence}</p>
                        <p className={buttonChecker == false ? "card-text stats hitpoints": 'card-text stats'}>Health: {buttonChecker ? challenger.health:challHealth}</p>   
                        
                    </div>
                </div>
                
                </div>
            <div className="col-6">
            <div className="card mt-5">
                    <img className="overlayImg" src={champ.link}></img>
                    {((winner!= 'challenger' && winner!= 'champion')&&(champDamage!=40)) && 
                        <p className='damage'>- {champDamage}</p>
                        }
                    {((winner == 'champion')) && 
                        <p className='winner'>Winner!</p>
                        }
                     {((winner == 'challenger')) && 
                        <p className='damage_lose'>Defeated</p>
                        }
                    <div className="card-body">
                        <h5 className="card-title">{champ.name}</h5>
                        <p className='card-text stats'>Strength: {champ.strength}</p>
                        <p className='card-text stats'>Speed: {champ.speed}</p>
                        <p className='card-text stats'>Agility: {champ.agility}</p>
                        <p className='card-text stats'>Endurance: {champ.endurance}</p>
                        <p className='card-text stats'>Camoflague: {champ.camoflague}</p>
                        <p className='card-text stats'>Intellegence: {champ.intellegence}</p>
                        <p className={buttonChecker == false ? "card-text stats hitpoints": 'card-text stats'}>Health: {buttonChecker ? champ.health:champHealth}</p>     
                    </div>     
                </div>
                       
            </div>
        </div>
        {(buttonChecker == true) &&
        <button type="submit" className="btn btn-danger mb-3 battleButton">Fight</button>
        }   
        </form>
    </div>
  )
}
