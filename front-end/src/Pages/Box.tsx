import './box.css'
function Box(props:any){
 return (<div className="box">
    <div className="amount">{props.amount}</div>
    <div className="name">{props.name}</div>
    <div className="message">{props.message}</div>
 </div>);
}

export default Box
