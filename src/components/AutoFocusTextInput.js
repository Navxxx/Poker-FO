import React from "react";


class AutoFocusTextInput extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
        this.textInput = React.createRef();
        this.handleKeyPress = this.handleKeyPress.bind(this)

    }

    componentDidMount() {
        this.textInput.current.focus();
        this.props.eraseTextInput();
        // console.log("mount")

      }

      componentDidUpdate(prevProps) {
        if (this.props.testInputfocus !== 0) {
            this.textInput.current.focus();
            // console.log(this.props.userfocus._iduser);
            this.props.setInputfocus(0);
            
        }
      }
    
      handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.props.handleBet(this.props.bet)
            this.props.eraseTextInput()
        }
        // console.log("handleKeyPress")
        // this.props.handleBet(this.props.bet,this.props.userfocus._iduser)
      }

    render() {
        //console.log(this.props.userfocus)
        return (
             <div id="bet-form" >
                    <input className="input-inaction" ref={this.textInput}
                        keyboardtype='numeric'
                        // type="number"
                        inputMode="decimal"
                        value={this.props.bet}
                        name="bet"
                        onChange={this.props.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
            </div>
        )
    }
}

export default AutoFocusTextInput;
