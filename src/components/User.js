import React from "react";
import Card from "./Card.js";
import { Twemoji } from 'react-emoji-render';



class User extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
        // this.handleChange = this.handleChange.bind(this)

    }

    // handleChange(event) {
    //     const {name, value} = event.target
    //     this.setState({[name]:value})
    // }



    render(){
        return (
            <div className={
                //if focus
                this.props.userfocus._name===this.props.name?"usercontainer":"usercontainer"
            }>
                <div 
                    // className={this.props.userfocus._name===this.props.name?"usercontent userfocus":"usercontent"}
                    className={"usercontent"}
                    >

                        <div className={"firstline"} onClick={()=>this.props.handleDealChange(this.props.id)}>
                                                      
                            <span className="username">{this.props.name}</span>
                            <span className="dealer">{this.props.dealer? <Twemoji text="🪀" />  :""} </span>

                        </div>

                        <div 
                            className={this.props.userfocus._name===this.props.name?"secondline userfocus":"secondline"}

                            // className={"secondline"} 
                            onClick={()=>this.props.handleClick(this.props.id)}>

                            <span className="username">{parseInt(this.props.cash)-parseInt(this.props.chips)} </span>
                            <span className="fold">{this.props.fold === 1?this.props.chips+" - Fold":this.props.chips}</span>


                        </div>
                    

                    {/* Focus : {this.state.focus===false?"false":"true"} */}
                    {/* Focus : {this.props.userfocus._name===this.props.name?"yes":"no"} */}

                    <br/>
                </div>
                <Card
                    idcard={this.props.cards[this.props.sitnumber+4+this.props.sitnumber-1]._idcard}
                    num={this.props.cards[this.props.sitnumber+4+this.props.sitnumber-1]._num}
                    family={this.props.cards[this.props.sitnumber+4+this.props.sitnumber-1]._family}
                    display={this.props.cards[this.props.sitnumber+4+this.props.sitnumber-1]._display}
                    toggleCard={this.props.toggleCard}
                    sitnumber={this.props.sitnumber}
                    currentuser={this.props.currentuser}
                 />
                 <Card
                    idcard={this.props.cards[this.props.sitnumber+5+this.props.sitnumber-1]._idcard}
                    num={this.props.cards[this.props.sitnumber+5+this.props.sitnumber-1]._num}
                    family={this.props.cards[this.props.sitnumber+5+this.props.sitnumber-1]._family}
                    display={this.props.cards[this.props.sitnumber+5+this.props.sitnumber-1]._display}
                    toggleCard={this.props.toggleCard}
                    sitnumber={this.props.sitnumber}
                    currentuser={this.props.currentuser}


                 />
                                 <br/>

             </div>

        )
    }
}

export default User;
