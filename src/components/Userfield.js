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
                        name="gain"
                        value={this.props.gain._gain}
                        onChange={(e) => this.props.handleChange(e,this.props.id)}
                />
                {this.props.gainbdd}
            </div>
        )
    }
}

export default Userfield;


