import React from "react";
import Game from "./Game.js";
import Login from "./Login.js";
import axios from 'axios';
import './style.css';

const domain = process.env.REACT_APP_DOMAIN
// console.log(domain)


// header won't be hidden on OnboardingScreen
// class OnboardingScreen extends React.Component {
//     static navigationOptions = { headerMode: null }
//   }

class App extends React.Component {

    constructor(){
        super ()
        this.state = {
            // isLoggedIn: false,
            // user :""

            isLoggedIn: false,
            // userName :"Tata",
            user : {}
        }
        this.handleLog = this.handleLog.bind(this)
        this.handleUnLog = this.handleUnLog.bind(this)

    }
    
    componentDidMount() {     
        ////////// DEBUG NO LOGIN
        // this.handleLog("Térence", "toto")
    }

    handleLog(e) {
        //console.log(e)
    
        axios.get(domain+'getcheckid.php?password_get='+ e)
        .then(res => {
            const userData = res.data; 
            if (userData) {
                // console.log(userData)
                this.setState({
                    user: userData,
                    isLoggedIn:true
                });
            }
            else {
                alert("Wrong password")
            }
        })
    }

    handleUnLog() {
        this.setState({isLoggedIn:false})
        // console.log(this)
    }

    render(){
        //console.log(this.state.user)
        return (
            /////  login.
            this.state.isLoggedIn ?
            <div>
                <Game user={this.state.user} userName={this.state.userName} handleUnLog={this.handleUnLog}/>
             </div>
            :
            <div>
                {/* hello */}
                <Login
                    handleLog={this.handleLog}
                />
            </div>

            /// debug no login.
            // <div className="gamecontainer">
            // <Game user={this.state.user} handleUnLog={this.handleUnLog}/>
            // </div>




        )
    }
};

export default App;