import React from "react";

class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            firstname : "",
            password :""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)

    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({[name]:value})
    }

    handleClick(e) {
        this.setState(
            (prevState)=>{
                let newStatePassword = prevState.password
                newStatePassword += e
                console.log(newStatePassword)
                if (newStatePassword.length===3) {
                    console.log("trois")
                    this.props.handleLog(newStatePassword)
                    newStatePassword=""
                }
                return({
                    password: newStatePassword
                })
            }
        )

    }

    // handleSubmit(e) {
    //     e.handleLog(this.state.firstname)
    // }

    render(){
        return (
            <div className="login"> 
                <p className="instruct">Tap your pass</p>
                <form>
                    {/* <input
                        type="text"
                        value={this.state.firstname}
                        name="firstname"
                        placeholder="Firstname"
                        onChange={this.handleChange}
                    />
                    <br/> */}
                    {/* <input
                        type="text"
                        value={this.state.password}
                        name="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                    />
                    <br/> */}
                </form>
                {/* <button onClick={()=>this.handleSubmit(this.props)}>Login</button> */}

{/* 
                <button onClick={()=>this.props.handleLog(this.state.password )} disabled={this.state.password.length===0}>Login</button> */}



                {/* <p>Name : {this.state.firstname}</p> */}
                <p className="pass">{this.state.password.length===0?"___":this.state.password}</p>

                <div className="keypad">

                    <button
                        onClick={()=>this.handleClick(1)}
                        className="login-button">
                        1
                    </button>
                    <button
                        onClick={()=>this.handleClick(2)}
                        className="login-button">
                        2
                    </button>
                    <button
                        onClick={()=>this.handleClick(3)}
                        className="login-button">
                        3
                    </button>
                    <button
                        onClick={()=>this.handleClick(4)}
                        className="login-button clear">
                        4
                    </button>
                    <button
                        onClick={()=>this.handleClick(5)}
                        className="login-button">
                        5
                    </button>
                    <button
                        onClick={()=>this.handleClick(6)}
                        className="login-button">
                        6
                    </button>
                    <button
                        onClick={()=>this.handleClick(7)}
                        className="login-button clear">
                        7
                    </button>
                    <button
                        onClick={()=>this.handleClick(8)}
                        className="login-button">
                        8
                    </button>
                    <button
                        onClick={()=>this.handleClick(9)}
                        className="login-button">
                        9
                    </button>
                    <button
                        className="login-button clear empty">
                    </button>
                    <button
                        onClick={()=>this.handleClick(0)}
                        className="login-button ">
                        0
                    </button>
                    <button
                        className="login-button empty">
                    </button>

                </div>
            </div>
        )
    }
}

export default Login;