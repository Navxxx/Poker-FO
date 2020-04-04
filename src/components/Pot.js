import React from "react";
import Deck from "./Deck.js";


class Pot extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }


    render() {
        // console.log(this.props.cards)

        // const headerStyle = {
        //     margin : "0px 0px 0px 0px",
        //     padding : "10px 10px 10px 10px",
        //     // backgroundColor : "black",
        //     color : "black"
        // }

        // console.log(this.props.pot._amount)
        return (
            //  <div style={headerStyle}>
            <div className="pot">
                {/* Pot : {this.props.pot._amount}
                <br/>
                <button onClick={()=>this.props.handlePotClick()}>Click to Pot</button>

                <br/> */}

                <Deck
                    cards={this.props.cards}
                    toggleCard={this.props.toggleCard}
                />
                <br/>
            </div>
        )
    }
}

export default Pot;


