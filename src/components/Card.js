import React from "react";


class Card extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }

    }

    render() {
        console.log(this.props.currentuser)

        let card
        // if current user is load
        if (typeof this.props.currentuser !== 'undefined'){
            // if the card belongs to the current user
            if (this.props.sitnumber===this.props.currentuser._sitnumber) {
                 // if visibility if yes
                 if(this.props.display===1) {
                    card = this.props.num+" "+this.props.family+" visible"
                 }
                // if is hidden
                else {
                    card = this.props.num+" "+this.props.family+" hidden"
                 }
            }
             // if the card doesnt belongs to the current user
            else
            {
                // if visibility if yes
                if(this.props.display===1) {
                    card = this.props.num+" "+this.props.family
                }
                // if is hidden
                else {
                    card = "XXXX"
                }
            }
        }
        // if the card is from the deck
        else {
            // if visibility if yes
            if(this.props.display===1) {
                card = this.props.num+" "+this.props.family
            }
            // if is hidden
            else {
                card = "XXXX"
            }
        }

        return (
             <div onClick={()=>this.props.toggleCard(this.props.idcard, this.props.sitnumber)}>
                 --------------
                 <br/>

                    {card}
                    <br/>

                    {/* dipslay : {this.props.display}
                    <br/>
                    id : {this.props.idcard}
                    <br/> */}
                --------------
            </div>
        )
    }
}

export default Card;
