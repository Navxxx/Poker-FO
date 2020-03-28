import React from "react";

class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            firstname : "",
            password :""
        }
        this.handleChange = this.handleChange.bind(this)

    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({[name]:value})
    }

    // handleSubmit(e) {
    //     e.handleLog(this.state.firstname)
    // }

    render(){
        return (
            <div> 
                <p>Login</p>
                <form>
                    <input
                        type="text"
                        value={this.state.firstname}
                        name="firstname"
                        placeholder="Firstname"
                        onChange={this.handleChange}
                    />
                    <br/>
                    <input
                        type="text"
                        value={this.state.password}
                        name="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                    />
                    <br/>
                </form>
                {/* <button onClick={()=>this.handleSubmit(this.props)}>Login</button> */}
                <button onClick={()=>this.props.handleLog(this.state.firstname,this.state.password )} disabled={this.state.password.length===0 || this.state.firstname.length===0}>Login</button>
                <p>Name : {this.state.firstname}</p>
                <p>Password : {this.state.password}</p>
            </div>
        )
    }
}

export default Login;