import React from "react";

class Header extends React.Component {

    constructor(props){
        super(props)
        this.state = {
        }

    }

    render(){

        // console.log()

        return (
            <div className="headerStyle">
                    {/* Hello {this.props.user.name} */}
                    {this.props.pot._window?

                    <button
                    className="buttonapp buttonresults"
                    onClick={()=>this.props.toggleResults(0)}
                    > 
                    Cancel
                    </button>
                    :
                    <button
                    className="buttonapp buttonresults"
                    onClick={()=>this.props.toggleResults(1)}
                    > 
                    Finish game
                    </button>
                    
 
                    }
     

 


                <button className="buttonapp center">
                    Pot : {this.props.pot._amount}
                </button>
                <button className="buttonapp buttonclicktopot" onClick={()=>this.props.handlePotClick()}>Click to Pot</button>

                <br/>
            </div>
        )
    }
}


export default Header;