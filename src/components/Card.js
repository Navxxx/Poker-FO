import React from "react";
import Emoji from "react-emoji-render";
import { Twemoji } from 'react-emoji-render';

class Card extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }

        this.handleButtonPress = this.handleButtonPress.bind(this)
        this.handleButtonRelease = this.handleButtonRelease.bind(this)
    }

    handleButtonPress () {
        this.buttonPressTimer = setTimeout(() => 
        {
            this.props.toggleCard(this.props.idcard, this.props.sitnumber)
        }, 500);
      }
    
      handleButtonRelease () {
        clearTimeout(this.buttonPressTimer);
      }

    render() {
        // console.log(this.props.currentuser)

        let card

        // let family = "X"
        // let number = 1
        // let visibility = "visibility-false"

        const a = "❤️"
        const b = "♣️"
        const c = "♦️"
        const d = "♠️"

        let cardfamily = ""
        let cardnumber = ""
        let cardvisibility = "hidden"

        // charging card data

        let rootnum = this.props.num
        let rootfam = ""
        if (this.props.family === "heart") {
            rootfam = a
        } 

        else if (this.props.family === "club") {
            rootfam = b
        } 

        else if (this.props.family === "diamond") {
            rootfam = c
        } 

        else if (this.props.family === "spade") {
            rootfam = d
        } 


        let num = ""
        let fam = ""

        // if current user is load
        if (typeof this.props.currentuser !== 'undefined'){

            // if the card belongs to the current user
            if (this.props.sitnumber===this.props.currentuser._sitnumber) {
                 // if visibility if yes
                 if(this.props.display===1) {
                    // card = this.props.num+" "+this.props.family+" visible"
                    cardvisibility = "displayed"
                    num = rootnum
                    fam = rootfam
                 }
                // if is hidden
                else {
                    // card = this.props.num+" "+this.props.family+" hidden"
                    cardvisibility = "hidden-for-others"
                    num = rootnum
                    fam = rootfam
                 }
            }
             // if the card doesnt belongs to the current user
            else
            {
                // if visibility if yes
                if(this.props.display===1) {
                    // card = this.props.num+" "+this.props.family
                    cardvisibility = "displayed"
                    num = rootnum
                    fam = rootfam
                }
                // if is hidden
                else {
                    cardvisibility = "hidden"
                }
            }
        }
        // if the card is from the deck
        else {
            // if visibility if yes
            if(this.props.display===1) {
                // card = this.props.num+" "+this.props.family
                cardvisibility = "displayed"
                num = rootnum
                fam = rootfam
            }
            // if is hidden
            else {
                // card = ""
                cardvisibility = "hidden"

            }
        }



        

        return (
             <div 
                className={cardvisibility + " card noselect"}

                // onDoubleClick={}
                
                onTouchStart={this.handleButtonPress} 
                onTouchEnd={this.handleButtonRelease} 
                onMouseDown={this.handleButtonPress} 
                onMouseUp={this.handleButtonRelease} 
                onMouseLeave={this.handleButtonRelease}

            >
                 <br/>
                    <Twemoji text={num + fam} />
                    {/* {card} */}
                    <br/>

                    {/* dipslay : {this.props.display}
                    <br/>
                    id : {this.props.idcard}
                    <br/> */}
            </div>
        )
    }
}

export default Card;
