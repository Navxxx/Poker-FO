import React from "react";
import Card from "./Card.js";


class Deck extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }

    }


    
    render() {

        console.log(this.props.cards)
        return (
             <div>
                 <Card
                    idcard={this.props.cards[0]._idcard}
                    num={this.props.cards[0]._num}
                    family={this.props.cards[0]._family}
                    display={this.props.cards[0]._display}
                    toggleCard={this.props.toggleCard}
                    sitnumber="0"
                 />
                 <Card
                    idcard={this.props.cards[1]._idcard}
                    num={this.props.cards[1]._num}
                    family={this.props.cards[1]._family}
                    display={this.props.cards[1]._display}
                    toggleCard={this.props.toggleCard}
                    sitnumber="0"

                 />
                 <Card
                    idcard={this.props.cards[2]._idcard}
                    num={this.props.cards[2]._num}
                    family={this.props.cards[2]._family}
                    display={this.props.cards[2]._display}
                    toggleCard={this.props.toggleCard}
                    sitnumber="0"

                 />
                 <Card
                    idcard={this.props.cards[3]._idcard}
                    num={this.props.cards[3]._num}
                    family={this.props.cards[3]._family}
                    display={this.props.cards[3]._display}
                    toggleCard={this.props.toggleCard}
                    sitnumber="0"

                 />
                 <Card
                    idcard={this.props.cards[4]._idcard}
                    num={this.props.cards[4]._num}
                    family={this.props.cards[4]._family}
                    display={this.props.cards[4]._display}
                    toggleCard={this.props.toggleCard}
                    sitnumber="0"

                 />
            </div>
        )
    }
}

export default Deck;
