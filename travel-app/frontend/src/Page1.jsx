import { useState } from "react";
import {useNavigate} from "react-router-dom";

function Page1(){
    const[pickup,setPickup]=useState("");
    const[destination,setDestination]=useState("");
    const[distance,setDistance]=useState("");
    const navigate=useNavigate();
    const next=()=>{
        navigate("/vehicle",{
            state:{pickup,destination,distance}
        });
    };
    return(
        <div>
            <h2>Trip Details</h2>
            <input placeholder="pickup location" onChange={e=>setPickup(e.target.value)}/><br/>
            <input placeholder="destination" onChange={e=>setDestination(e.target.value)}/><br/>
            <input placeholder="Distance(km)" onChange={e=>setDistance(e.target.value)}/><br/>
            <button onClick={next}>Next </button>
        </div>
    );
}

export default Page1;