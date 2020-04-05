import React from "react";
import Userfield from "./Userfield.js";


class Results extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // usersgain : [],
            // gainloaddata :false
            proposed :0,
        }
        this.sumGain = this.sumGain.bind(this)
        this.handlePropose = this.handlePropose.bind(this)
    }



    sumGain(array) {
        let Totalgain = 0
        array.forEach(user => {
            Totalgain += user._gain
        });
        return Totalgain
    } 

    handlePropose(e) {
        // console.log(e)
        this.setState({proposed:e})
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
                    <div className="resultsum noselect">
                        Total : {this.sumGain(this.props.gains)} {this.sumGain(this.props.users)}  
                    </div>

                    {Userfields}
                <div className="resultbuttons">

                    <button
                    className="resultbutton leftbutton noselect"
                    onClick={()=>{
                        this.props.handleGainChange()
                        this.props.handleGainClear()
                        this.handlePropose(1)
                    }}
                    >
                    Apply changes
                    </button>

                <button
                className="resultbutton leftbutton noselect"
                onClick={()=>{
                    
                    this.props.handleGainChangeClear()
                }}
                >
                    Clear changes
                </button>
                

                    <button
                        className="resultbutton validatebutton noselect"
                        onClick={()=>{
                            this.props.validateResult()

                            // this.props.toggleResults(0)
                        }}
                    >
                        Validate</button>


                <button
                        className="resultbutton shufflebutton noselect"
                        onClick={()=>{
                            this.props.shuffle()
                            // this.props.toggleResults(0)
                        }}
                    >
                        Shuffle</button>
                        </div>
            </div>
        )
    }
}

export default Results;


