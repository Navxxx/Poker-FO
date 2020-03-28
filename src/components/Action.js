import React from "react";
import AutoFocusTextInput from "./AutoFocusTextInput.js";


class Action extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            bet : 0,
            actionStatus: "normal"
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.eraseTextInput = this.eraseTextInput.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(event) {
        const {name, value} = event.target
        if (value >= 0){ 
            this.setState ({
                [name] : value
            })
        }
    }

    eraseTextInput() {
        this.setState({bet:""})
    }


    handleClick(){
        this.state.actionStatus==="normal"
        ?
        this.setState ({
            actionStatus:"pasnormal"
        })
        :
        this.setState ({
            actionStatus:"normal"
        })
    }

    render() {
        //console.log(this.props.userfocus)
        return (
            <div>
                {/* {this.state.actionStatus==="normal"
                ? */}
                    <div>
                        Select an action for {this.props.userfocus._name}
                        <br/>
                        {/* <button onClick={this.handleClick}>bet</button> */}
                    </div>
                {/* : */}

                <div>
                    <AutoFocusTextInput
                        bet={this.state.bet}
                        handleChange={this.handleChange}
                        handleBet={this.props.handleBet}
                        eraseTextInput={this.eraseTextInput}
                    />
                    {/* <button onClick={this.handleClick}>Cancel</button> */}
                    <button onClick={()=>this.props.handleBet(this.state.bet)}>Bet</button>
                    <button onClick={()=>this.props.handleFold(this.props.userfocus._iduser)}>fold</button>

                </div>
            {/* } */}
                <br/>



            </div>
            )
    }
}

export default Action;





