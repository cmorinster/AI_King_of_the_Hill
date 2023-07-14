import React, { useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';



export default function CreateCharacter({ loggedIn, flashMessage }) {

    const navigate = useNavigate();
    async function handleSubmit(e){
        e.preventDefault();
        let creature = e.target.creature.value;
        let action = e.target.action.value;
        let art = e.target.art.value;
        let name = e.target.name.value;
        let strength = getRandomInt(9, 18);
        let intellegence = getRandomInt(9,18);
        let camoflague = getRandomInt(9, 18);
        let agility = getRandomInt(9, 18);
        let speed = getRandomInt(9,18);
        let endurance = getRandomInt (9,18);
        let health = getRandomInt (23,25);
        let description = `${creature} ${action} in the style of ${art}`;
        let link = `${creature} ${action} in the style of ${art}`;
        let token = localStorage.getItem('token');
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${token}`);

        let requestBody = JSON.stringify({ name, description, link, strength, agility, intellegence, speed, endurance, camoflague, health})
        console.log(requestBody)
        fetch('http://3.23.92.242/api/characters', {
            method: 'POST',
            headers: myHeaders,
            body: requestBody
            
        })
            .then(async response => {
            let data = await response.json();
            localStorage.setItem('charId', data.id);
            navigate('/battle');
            });
           

        //"sk-1JFhctulU7TRrUkmMv5KzqtYMqZUvFCmI5Kl9UT9TFEZ7Fp4"
        //`${creature}${action} in the style of ${art}`
        // try{
        // const response = await openai.Image.create({
        //       prompt: `${creature}${action} in the style of ${art}`,
        //       n: 1,
        //       size: "256X256"
        // });
        // const img_url = response.data.data[0].url;
        // console.log(img_url)
        // setImg(img_url);
        // }catch (error) {
        //     if (error.response) {
        //         console.log(error.response.status);
        //         console.log(error.response.data);
        //       } else {
        //         console.log(error.message);
        //       }
        // }
        
        
    }


    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min)
    
    }
    // useEffect(() => {
    //     if (!loggedIn){
    //         flashMessage('You must be logged in to create a new character', 'danger');
    //         navigate('/login');
    //     }

    // })

    return (
        <>
        <div className="row">
            <form action="" onSubmit={handleSubmit}>
            <div className="form-group MarginForm">
            
            <div className="col-5">
                <h5 className='MenuText'>Name</h5>
                <input type="text" name="name" className="form-control InputText" placeholder="Enter Character's Name" />
                <h5 className='MenuText'>Creature Type</h5>
                <input className="form-control InputText" name="creature" />
                {/* <select className="form-select InputText" name = "creature">
                    <option value="Aardvark">Aardvark</option>
                    <option value="Beaver">Beaver</option>
                    <option value="Cat">Cat</option>
                    <option value="Cucumber">Cucumber</option>
                    <option value="Dinosaur">Dinosaur</option>
                    <option value="Dog">Dog</option>
                    <option value="Dragon">Dragon</option>
                    <option value="Duck">Duck</option>
                    <option value="Elephant">Elephant</option>
                    <option value="Goat">Goat</option>
                    <option value="Gorilla">Gorilla</option>
                    <option value="Lion">Lion</option>
                    <option value="Manta Ray">Manta Ray</option>
                    <option value="Mummy">Mummy</option>
                    <option value="Narwhal">Narwhal</option>
                    <option value="Orc">Orc</option>
                    <option value="Otter">Otter</option>
                    <option value="Pig">Pig</option>
                    <option value="Raccoon">Raccoon</option>
                    <option value="Robot">Robot</option>
                    <option value="Snake">Snake</option>
                    <option value="Turtle">Turtle</option>
                    <option value="Walrus">Walrus</option>
                    <option value="Werewolf">Werewolf</option>
                    <option value="Yak">Yak</option>
                    <option value="Zombie">Zombie</option>

                </select> */}
            </div>
            <div className="col-5">
                <h5 className='MenuText'>Action</h5>
                <input className="form-control InputText" name="action" />
                {/* <select className="form-select InputText" name = "action">
                    <option value="Breathing Fire">Breathing Fire</option>
                    <option value="Carrying groceries">Carrying Groceries</option>
                    <option value="Catching Fireflys With a Net">Catching Fireflys With a Net</option>
                    <option value="Directing Traffic">Directing Traffic</option>
                    <option value="Grappling its Twin">Grappling its Twin</option>
                    <option value="Holding an Axe">Holding an Axe</option>
                    <option value="Holding Watermelons">Holding Watermelons</option>
                    <option value="In a Hot Air Balloon">In a Hot Air Balloon</option>
                    <option value="In a trenchcoat">In a Trenchcoat</option>
                    <option value="Juggling Apples">Juggling Apples</option>
                    <option value="Lifting Weights">Lifting Weights</option>
                    <option value="On the set of 8 Mile">On the set of 8 Mile</option>
                    <option value="Pushing a Wheelbarrow">Pushing a Wheelbarrow</option>
                    <option value="Riding a Horse">Riding a Horse</option>
                    <option value="Skateboarding">Skateboarding</option>
                    <option value="Wearing Armor">Wearing Armor</option>
                    <option value="Wearing Suspenders">Wearing Suspenders</option>
                    <option value="Wielding a Broad Sword">Wielding a Broad Sword</option>
                    <option value="With Horns">With Horns</option>
                    <option value="With a Jetpack">With a Jetpack</option>
                </select> */}
            </div>
            <div className="col-5">
             <h5 className='MenuText'>Art Style</h5>
                <select className="form-select InputText" name = "art">
                    <option value="1940s style Comic Book">1940s style Comic Book</option>
                    <option value="1990s style Cartoon">1990s style Cartoon</option>
                    <option value="Art Nouveau">Art Nouveau</option>
                    <option value="Anime Portrait">Anime Portrait</option>
                    <option value="Cave painting">Cave painting</option>
                    <option value="Children's drawing">Children's drawing</option>
                    <option value="Cyberpunk">Cypberpunk</option>
                    <option value="Diagrammatic Drawing">Diagrammatic Drawing</option>
                    <option value="Graffiti">Graffiti</option>
                    <option value="Impressionist Painting">Impressionist Painting</option>
                    <option value="Normal Rockwell">Norman Rockwell</option>
                    <option value="On a Wanted Poster">On a Wanted Poster</option>
                    <option value="Oil Painting">Oil Painting</option>
                    <option value="Picasso">Picasso</option>
                    <option value="Pixel Art">Pixel Art</option>
                    <option value="Pastel Drawing">Pastel Drawing</option>
                    <option value="Photograph">Photograph</option>
                    <option value="Photorealism">Photorealism</option>
                    <option value="Renaissance Painting">Renaissance Painting</option>
                    <option value="Surrealism">Surrealism</option> 
                    <option value="Ukiyo-e art">Ukiyo-e art</option>
                    <option value="Van Gogh">Van Gogh</option>
                    <option value="Watercolour">Watercolour</option>
                    <option value="Yoshitaka Amano">Yoshitaka Amano</option>

                </select>
                
            </div>
            <div className="col-auto mt-3">
                <button type="submit" className="btn btn-success mb-3 ButtonApp">Generate</button>
            </div>
            </div>
            </form>
    </div>
        <div className="row">
    
        </div>
    </>

        
    )



}