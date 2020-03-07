import React from "react";

function Header(props) {

    const headerStyle = {
        margin : "0px 0px 0px 0px",
        padding : "10px 10px 10px 10px",
        backgroundColor : "black",
        color : "white"
    }
    const decoLinkStyle = {
        float :"right",
        color :"white"
    } 

    return (
        <div style={headerStyle}>
            <p>
                Hello {props.user._name}
                <a onClick={()=>props.handleUnLog()} href="http://localhost:3000/" style={decoLinkStyle}>deco</a>
            </p>
        </div>
    )
}

export default Header;