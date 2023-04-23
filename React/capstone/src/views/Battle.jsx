import React, {useState, useEffect} from 'react'

export default function Battle() {
    const [challenger, setChallenger] = useState({});
    const [champ, setchamp] = useState({});
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
    

    async function handleSubmit(e){ 
        e.preventDefault();
        let challengerTotal = (challenger.strength + challenger.agility + challenger.speed +challenger.camoflague + challenger.endurance + challenger.intellegence)/12;
        let champTotal = (champ.strength + champ.agility + champ.speed +champ.camoflague + champ.endurance + champ.intellegence)/12;
        let champHP = champ.health*15;
        let challengerHP = challenger.health*15;
        while (champHP > 0 && challengerHP > 0){
            let challengerRoll = getRandomInt(1, 5);
            let champRoll = getRandomInt(1, 5);
            champHP -= challengerTotal*challengerRoll;
            challengerHP -= champTotal*champRoll;
            console.log(challengerHP)
            console.log(champHP)
        }
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
                    <img src={champ.link}></img>
                    <div className="card-body">
                        <h5 className="card-title">{champ.name}</h5>
                        <p className='card-text stats'>Strength: {champ.strength}</p>
                        <p className='card-text stats'>Speed: {champ.speed}</p>
                        <p className='card-text stats'>Agility: {champ.agility}</p>
                        <p className='card-text stats'>Endurance: {champ.endurance}</p>
                        <p className='card-text stats'>Camoflague: {champ.camoflague}</p>
                        <p className='card-text stats'>Intellegence: {champ.intellegence}</p>
                        <p className='card-text stats'>Health: {champ.health}</p>     
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
