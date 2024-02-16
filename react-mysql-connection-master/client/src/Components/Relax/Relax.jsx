import React, { useEffect, useState} from 'react'
import './Relax.css'
import Axios from "axios";

import meditationImg from './meditation.png'
import musicImg from './music.png'


const API  = 'API_KEY'
const channelId = "UChSpME3QaSFAWK8Hpmg-Dyw"

const fetchURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelId}&part=snippet,id&order=date&maxResult=10`;

const Relax = () => {
    const [allvideos,setAllvideos] = useState([]);
    const[meditationVid, setMeditationVid] = useState(null);

    useEffect(() => {
        fetch(fetchURL).then((response)=> response.json()).then((resJson)=>{
            const result = resJson.items.map(doc=>({
                ...doc,
                Videolink: "https://www.youtube.com/embed/" + doc.id.videoId
            }));
            setAllvideos(result)
        })
    }, [])
    console.log(allvideos)
    
    const handleMeditationVid = (video) => {
        setMeditationVid(video);
    }

    return(
        
        <div className="container">
            <div className="button-container">
                <div className= "image-container">
                    <img src={meditationImg} alt="react logo" />
                </div>
                <button onClick={ handleMeditationVid} className="btn">Meditation</button> 
            </div>
            <div className = "divider"></div>
            <div className="button-container">
                <div className= "image-container">
                    <img src={musicImg} alt="react logo" />
                </div>
            <button name="submit" className="btn">Music</button>
            </div>
            
             {meditationVid && allvideos.length > 0 && (
            <div>
                {allvideos.map((item)=> {
                    return(
                        <div>
                            <iframe 
                                width="560" 
                                height="315" 
                                src= {item.Videolink}
                                title="YouTube video player" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowfullscreen
                ></iframe>
                        </div>
                    )
                })}
            </div>
        )}
        </div>
    );
  };

export default Relax