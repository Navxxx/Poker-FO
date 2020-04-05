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
             <div className="userfield">
                <button className="button-inresult" onClick={()=>this.props.handleTakeAll(this.props.id)}>Take all</button>
                <span className="name-inresult">{this.props.name}</span>

                <span className="input-inresult">
                <input 
                        className="input-inresult"
                        keyboardtype='numeric'
                        type="number"
                        name="gain"
                        value={this.props.gain._gain}
                        onChange={(e) => this.props.handleChange(e,this.props.id)}
                />
                </span>
                <span className="gain-inresult">{this.props.gainbdd}</span>
            </div>
        )
    }
}

export default Userfield;


