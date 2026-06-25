import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage(){
return(
<div className="landingPageContainer">
<nav>
<div className="navHeader">
    <h2>Apna Video Call</h2>
</div>
<div className="navList">
<p>Join as Guest</p>
<p>Register</p>
<div role="button">
    <p>login</p>
</div>
</div>

</nav>

<div className="landingMainContainer">
<div className="content">
<h1><span style={{color:'#ff9839'}}>Connect</span> with  your Loved Ones</h1>
<p> cover distance by Apna Video call</p>

<div  className="btn_start"role="button">
<Link to={"/auth"}>Get Started</Link>
</div>
</div>
<div>

    <img src="/public/mobile.png"/>
</div>

</div>

</div>

);
}