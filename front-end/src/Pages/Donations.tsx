import {Component, useState} from "react";
import {WebSocketContext} from "../Context/Webscoket";
import Box from './Box'
class Donations extends Component {
 static contextType = WebSocketContext;

    
 //   const [donations,setDonations] = useState([{name:"",amount:0.,message:""}]);
//    const ws = new WebSocket('ws://localhost:5000/notify');
//    ws.onopen = (event) => {
//        console.log(event);
//    }
//    ws.onmessage = (event) => {
//        const json = JSON.parse(event.data);
//        try{
//            console.log(json);
//            setDonations((d) => {return [...d.slice(-4),json]});
//        }
//        catch(err)
//        {
//            console.log(err);
//        }
//    }
//    const setError = (ev:any) =>{
//        setDonations([{name:"error",amount:0,message:"We lost connection"}]);
//    }
//    ws.onclose = setError;
//    ws.onerror = setError;
//           {donations.map((item) => ( <Box name={item.name} amount={item.amount} message={item.message} /> ))}
// 
    render(){
    let data = this.context;
    console.log(data?.data);
    return (<div> 
            </div>
           );
        }
}

export default Donations
