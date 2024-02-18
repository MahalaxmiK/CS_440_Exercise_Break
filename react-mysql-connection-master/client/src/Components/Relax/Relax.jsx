import React, { useEffect, useState} from 'react'
import './Relax.css'
import Axios from "axios";

import meditationImg from './meditation.png'
import musicImg from './music.png'


const API  =  "AIzaSyDQjZ79ul59xynIC9vdJ7IM5XQYLi_mKt8"
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
        const randomGenerator = Math.ceil(Math.random() * allvideos.length)
        const getIndex = allvideos[randomGenerator]
        const videoURL = `https://www.youtube.com/embed/${getIndex.id.videoId}`
        window.open(videoURL, '_blank')
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


