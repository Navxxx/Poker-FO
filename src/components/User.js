import React from "react";
import Card from "./Card.js";



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
            <div >
                <div onClick={()=>this.props.handleDealChange(this.props.id)}>
                    Dealer : {this.props.dealer} 
                </div>
                Name : {this.props.name} 
                <br/>
                Cave : {parseInt(this.props.cash)-parseInt(this.props.chips)} 
                <br/>
                <div onClick={()=>this.props.handleClick(this.props.id)}>
                    
                        <span>Mise : {this.props.chips}</span>
                        <span>{this.props.fold === 1?" - Fold":""}</span>

                </div>
                {/* Focus : {this.state.focus===false?"false":"true"} */}
                Focus : {this.props.userfocus._name===this.props.name?"yes":"no"}

                <br/>
                <Card
                    idcard={this.props.cards[this.props.sitnumber+4+this.props.sitnumber-1]._idcard}
                    num={this.props.cards[this.props.sitnumber+4+this.props.sitnumber-1]._num}
                    family={this.props.cards[this.props.sitnumber+4+this.props.sitnumber-1]._family}
                    display={this.props.cards[this.props.sitnumber+4+this.props.sitnumber-1]._display}
                 />
                 <Card
                    idcard={this.props.cards[this.props.sitnumber+5+this.props.sitnumber-1]._idcard}
                    num={this.props.cards[this.props.sitnumber+5+this.props.sitnumber-1]._num}
                    family={this.props.cards[this.props.sitnumber+5+this.props.sitnumber-1]._family}
                    display={this.props.cards[this.props.sitnumber+5+this.props.sitnumber-1]._display}
                 />
                                 <br/>

             </div>

        )
    }
}

export default User;
