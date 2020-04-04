import React from "react";
import Userfield from "./Userfield.js";


class Results extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // usersgain : [],
            // gainloaddata :false
        }
        this.sumGain = this.sumGain.bind(this)

    }



    sumGain(array) {
        let Totalgain = 0
        array.forEach(user => {
            Totalgain += user._gain
        });
        return Totalgain
    } 

    render() {

        const Userfields = this.props.users.map(
            user => <Userfield
                id={user._iduser}
                key={user._iduser}
                name={user._name}
                sitnumber={user._sitnumber}
                handleChange={this.props.handleChange}
                handleTakeAll={this.props.handleTakeAll}
                gain = {this.props.gains.find(function (item) {
                    return item._iduser === user._iduser;
                  })}
                // gainloaddata = {this.state.gainloaddata}
                gainbdd={user._gain}
            />
        )
        
        // console.log(this.state.usersgain)  
    
        


        return (
             <div className="result">
                Results : {this.sumGain(this.props.gains)} {this.sumGain(this.props.users)}  
                {Userfields}
                <div className="resultbuttons">
                    <button
                        className="resultbutton"
                        onClick={()=>this.props.handleGainChange()}
                    >
                        Apply changes
                    </button>
                    <button
                        className="resultbutton"
                        onClick={()=>this.props.handleGainClear()}
                    >
                        Clear changes
                    </button>
                    <button
                        className="resultbutton"
                        onClick={()=>this.props.validateResult()}
                    >
                        Validate</button>
                </div>
            </div>
        )
    }
}

export default Results;


