import React from "react";


class Userfield extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }


    render() {
        // console.log(this.props.gain)
        // console.log(this.props.gainloaddata)

        return (
             <div>
                {this.props.name} : 
                <input 
                        keyboardtype='numeric'
                        type="number"
                        name="bet"
                        placeholder={this.props.gain}
                />
                
            </div>
        )
    }
}

export default Userfield;


