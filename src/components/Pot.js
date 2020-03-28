import React from "react";


class Pot extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }


    render() {
        const headerStyle = {
            margin : "0px 0px 0px 0px",
            padding : "10px 10px 10px 10px",
            // backgroundColor : "black",
            color : "black"
        }

        // console.log(this.props.pot._amount)
        return (
             <div style={headerStyle}>
                Pot : {this.props.pot._amount}
                <button>Click to Pot</button>
            </div>
        )
    }
}

export default Pot;
