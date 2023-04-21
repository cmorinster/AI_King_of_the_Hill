import React, { useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';



// let OPENAI_API_KEY = "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"
// const OpenAI = require("openai");
// const { Configuration, OpenAIApi } = OpenAI;
//  const configuration = new Configuration({
//   apiKey: OPENAI_API_KEY,
//   formDataCtor: CustomFormData
//  });
// const openai = new OpenAIApi(configuration);



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
        let health = getRandomInt (18,25);
        let link = `${creature} ${action} in the style of ${art}`

        let token = localStorage.getItem('token')
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${token}`);

        let requestBody = JSON.stringify({ name, link, strength, agility, intellegence, speed, endurance, camoflague, health})
        console.log(requestBody)
        fetch('http://127.0.0.1:5000/api/characters', {
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
            <div className="form-group">
            <h2>Name</h2>
            <input type="text" name="name" className="form-control my-3" placeholder="Enter Character's Name" />
            <div className="col-5">
                <h5>Creature Type</h5>
                <select className="form-select" name = "creature">
                    <option value="Aardvark">Aardvark</option>
                    <option value="Cat">Cat</option>
                    <option value="Dinosaur">Dinosaur</option>
                    <option value="Dog">Dog</option>
                    <option value="Dragon">Dragon</option>
                    <option value="Elephant">Elephant</option>
                    <option value="Goat">Goat</option>
                    <option value="Gorilla">Gorilla</option>
                    <option value="Lion">Lion</option>
                    <option value="Manta Ray">Manta Ray</option>
                    <option value="Mummy">Mummy</option>
                    <option value="Narwhal">Narwhal</option>
                    <option value="Orc">Orc</option>
                    <option value="Otter">Otter</option>
                    <option value="Raccoon">Raccoon</option>
                    <option value="Robot">Robot</option>
                    <option value="Snake">Snake</option>
                    <option value="Turtle">Turtle</option>
                    <option value="Walrus">Walrus</option>
                    <option value="Werewolf">Werewolf</option>
                    <option value="Yak">Yak</option>
                    <option value="Zombie">Zombie</option>

                </select>
            </div>
            <div className="col-5">
                <h5>Action</h5>
                <select className="form-select" name = "action">
                    <option value="Breathing Fire">Breathing Fire</option>
                    <option value="Catching Fireflys With a Net">Catching Fireflys With a Net</option>
                    <option value="Directing Traffic">Directing Traffic</option>
                    <option value="Holding an Axe">Holding an Axe</option>
                    <option value="Holding Watermelons">Holding Watermelons</option>
                    <option value="In a Hot Air Balloon">In a Hot Air Balloon</option>
                    <option value="Juggling Chainsaws">Juggling Chainsaws</option>
                    <option value="Lifting Weights">Lifting Weights</option>
                    <option value="Pushing a Wheelbarrow">Pushing a Wheelbarrow</option>
                    <option value="Riding a Horse">Riding a Horse</option>
                    <option value="Skateboarding">Skateboarding</option>
                    <option value="With Horns">With Horns</option>
                    <option value="With a Jetpack">With a Jetpack</option>
                    <option value="Wearing Armor">Wearing Armor</option>
                    <option value="Wearing Suspenders">Wearing Suspenders</option>
                </select>
            </div>
            <div className="col-5">
             <h5>Art Style</h5>
                <select className="form-select" name = "art">
                    <option value="1940s style Cartoon">1940s style Cartoon</option>
                    <option value="1990s style Advertisement">1990s style Advertisement</option>
                    <option value="Anime Portrait">Anime Portrait</option>
                    <option value="Cave painting">Cave painting</option>
                    <option value="Children's drawing">Children's drawing</option>
                    <option value="Cyberpunk">Cypberpunk</option>
                    <option value="Diagrammatic Drawing">Diagrammatic Drawing</option>
                    <option value="Graffiti">Graffiti</option>
                    <option value="On a Wanted Poster">On a Wanted Poster</option>
                    <option value="Oil Painting">Oil Painting</option>
                    <option value="Pixel Art">Pixel Art</option>
                    <option value="Pastel Drawing">Pastel Drawing</option>
                    <option value="Photograph">Photograph</option>
                    <option value="Ukiyo-e art">Ukiyo-e art</option>
                    <option value="Watercolour">Watercolour</option>

                </select>
                
            </div>
            <div className="col-auto mt-3">
                <button type="submit" className="btn btn-success mb-3">Generate</button>
            </div>
            </div>
            </form>
    </div>
        <div className="row">
    
        </div>
    </>

        
    )



}