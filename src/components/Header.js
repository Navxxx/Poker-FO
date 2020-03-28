import React from "react";

class Header extends React.Component {

    constructor(props){
        super(props)
        this.state = {
        }

    }

    render(){
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
        // console.log(this.props.user)

        return (
            <div style={headerStyle}>
                <p>
                    Hello {this.props.user.name}
                    <a onClick={()=>this.props.handleUnLog()} href="http://localhost:3000/" style={decoLinkStyle}>deco</a>
                </p>
            </div>
        )
    }
}


export default Header;