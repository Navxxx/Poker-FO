import React from "react";
import AutoFocusTextInput from "./AutoFocusTextInput.js";


class Action extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            bet : 0
        }
        this.handleChange = this.handleChange.bind(this)
        this.eraseTextInput = this.eraseTextInput.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(event) {
        // console.log("handlcechange")
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




    render() {
        //console.log(this.props.userfocus)
        return (
            <div className="action">
                {/* {this.state.actionStatus==="normal"
                ? */}
                    <div className="actionlabel">
                        Select an action for {this.props.userfocus._name}
                        <br/>
                        {/* <button onClick={this.handleClick}>bet</button> */}
                    </div>
                {/* : */}

                <div className="betform-container">
                    <AutoFocusTextInput
                        bet={this.state.bet}
                        handleChange={this.handleChange}
                        handleBet={this.props.handleBet}
                        eraseTextInput={this.eraseTextInput}
                        testInputfocus = {this.props.testInputfocus}
                        setInputfocus={this.props.setInputfocus}
                        userfocus={this.props.userfocus}

                    />
                    {/* <button onClick={this.handleClick}>Cancel</button> */}


                    <button className="button-inaction firstof" onClick={
                        ()=>{
                            this.props.handleFold(this.props.userfocus._iduser)
                            this.eraseTextInput()
                        }
                        }>
                            fold
                    </button>

                    <button className="button-inaction" onClick={
                        ()=>{
                            this.props.handleBet(this.state.bet,this.props.userfocus._iduser)
                            this.eraseTextInput()
                            // console.log("PRESSE")
                        }
                        }>
                            Bet
                    </button>



                </div>
            {/* } */}
                <br/>



            </div>
            )
    }
}

export default Action;





