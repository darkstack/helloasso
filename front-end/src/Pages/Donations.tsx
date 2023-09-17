import {useState} from "react";
import Box from './Box'
function Donations(){
    const [donations,setDonations] = useState([{name:"",amount:0.,message:""}]);
    const ws = new WebSocket('ws://localhost:5000/notify');
    ws.onopen = (event) => {
        console.log(event);
    }
    ws.onmessage = (event) => {
        const json = JSON.parse(event.data);
        try{
            setDonations([...donations.slice(-4),json]);
        }
        catch(err)
        {
            console.log(err);
        }
    }
    const setError = (ev:any) =>{
        setDonations([{name:"error",amount:0,message:"We lost connection"}]);
    }
    ws.onclose = setError;
    ws.onerror = setError;

    return (<div>
            {donations.map((item) => ( <Box name={item.name} amount={item.amount} message={item.message} /> ))}
            </div>
           );
}

export default Donations
