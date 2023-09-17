import {useState} from "react";
import {Link} from "react-router-dom";

function Home(){
    return (
            <div>
            <h2>Hello Asso Front Pages</h2><br/>
            <Link to="/donations">Donations</Link>
            <Link to="/total">Totals</Link>
            </div>
           );
}

export default Home

