import React from "react";


class Card extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }

    }

    render() {
        return (
             <div onClick={()=>this.props.toggleCard(this.props.idcard, this.props.sitnumber)}>
                 --------------
                 <br/>
                {this.props.num} 
                {" "}      
                {this.props.family}
                <br/>
                dipslay : {this.props.display}
                <br/>
                id : {this.props.idcard}
                <br/>
                --------------
            </div>
        )
    }
}

export default Card;
