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
            padding : "0px",
            height : "48px",
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
                    {/* Hello {this.props.user.name} */}
                    <button
                        className="buttonapp"
                        onClick={()=>this.props.toggleResults(1)}
                    > 
                        Finish game
                    </button>
                    <button
                        className="buttonapp"
                        onClick={()=>this.props.toggleResults(0)}
                    > 
                        Cancel
                    </button>
                </p>
            </div>
        )
    }
}


export default Header;