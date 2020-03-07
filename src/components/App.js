import React from "react";
import Game from "./Game.js";
import Login from "./Login.js";
import axios from 'axios';


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
        //this.handleLog("Toto")
    }

    handleLog(e) {
        //console.log(e)
        this.setState({isLoggedIn:true, user :e })
        axios.get("/Krypton/BO_CURRENT/Model/RequestGet/getUser.php?user=" + e)
        .then(res => {
            const userData = res.data; 
            this.setState({
                user: userData
            });
        })
    }

    handleUnLog() {
        this.setState({isLoggedIn:false})
        // console.log(this)
    }

    render(){
        //console.log(this.state.user)
        return (
            ///////  login.
            this.state.isLoggedIn ?
            <div>
                <Game user={this.state.user} userName={this.state.userName} handleUnLog={this.handleUnLog}/>
             </div>
            :
            <div>
                <Login handleLog={this.handleLog}/>
            </div>

            ///// debug no login.
            // <div>
            // <Game user={this.state.user} handleUnLog={this.handleUnLog}/>
            // </div>




        )
    }
};

export default App;