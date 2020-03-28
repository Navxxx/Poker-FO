import React from "react";
import UserList from "./UserList.js";
import Action from "./Action.js";
import Header from "./Header.js";
import Pot from "./Pot.js";
import axios from 'axios';

class Game extends React.Component {

    constructor(props){
        super (props)
        this.state = {
            userDataisLoaded : false,
            users: [],
            userfocus: [],
            currentdealer: [],
            potData:[]
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleFold = this.handleFold.bind(this)
        this.handleBet = this.handleBet.bind(this)
        this.handleDealChange = this.handleDealChange.bind(this)

    }
    
    handleClick(e) {
        this.setState({focus:"true"})
        // console.log(e)
        this.state.users.map((user, i)=>{
            if (i+1 === e )
            return (
                // console.log(e)
                this.setState({userfocus:user})
            )
        })
    }

    // filter(word => word.length > 6)

    handleFold(e) {
        this.setState(
            (prevState)=>{
                const newStateUsers = prevState.users.map(
                    (user, i) => {
                        if (i+1 === e) {
                            user._fold = 1;
                            user._chips = 0
                        }
                        return user
                    }
                )
                return({
                    users: newStateUsers
                })
            }
        )

        const form = new FormData()
        form.set('player_post', e)
        axios.post('/PokerBO/Model/Requests/postfold.php', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
          })
    }


    handleBet(e) {
        this.setState(
            (prevState)=>{
                const newStateUsers = prevState.users.map(
                    (user, i) => {
                        if (i+1 === e) {
                            user._fold = 0;
                            user._chips = e
                        }
                        return user
                    }
                )
            }
        )

        const form = new FormData()
        form.set('bet_post', e)
        form.set('player_post', this.state.userfocus._iduser)
        axios.post('/PokerBO/Model/Requests/postbet.php', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
          })

        const formb = new FormData()
        formb.set('player_post', e)
        axios.post('/PokerBO/Model/Requests/postunfold.php', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        })
    }


    handleDealChange(e) {
        this.setState(
            (prevState)=>{
                const newStateUsers = prevState.users.map(
                    (user, i) => {
                        if (i+1 === e) {
                            user._dealer = 1
                        }
                        else {
                            user._dealer = 0
                        }
                        return user
                    }
                )
                return({
                    users: newStateUsers
                })
            }
        )

        const form = new FormData()
        form.set('player_post', e)
        axios.post('/PokerBO/Model/Requests/postdealer.php', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
          })
    }

    componentDidMount() {        
        ///// Get User list ///
        axios.get("PokerBO/Model/Requests/getlist.php?")
        .then(res => {
            const users = res.data; 
            this.setState({
                users: users,
                userfocus: users[0],
            });
        })

        ///// Get pot ///
        axios.get("PokerBO/Model/Requests/getpot.php?")
        .then(res => {
            const potData = res.data; 
            this.setState({
                potData: potData,
            });
        })

        // set interval to display duratino in real time
        setInterval( () => {
            // console.log(this.props.user.iduser)

            ///// Get User list ///
            axios.get("PokerBO/Model/Requests/getlistordered.php?usersitnumber="+this.props.user.sitnumber)
            .then(res => {
                const users = res.data; 
                this.setState({
                    users: users,
                    userDataisLoaded: true

                });
                
            })

        },1000)

    }  


    render(){

    // console.log(this.state.potData)

        return (

            this.state.userDataisLoaded===true
            ?
                <div>
                    <Header user={this.props.user} handleUnLog={this.props.handleUnLog}/>
                    {/* {this.state.user} */}
                    <Pot
                        pot={this.state.potData}
                    />
                    <UserList
                        users={this.state.users}
                        handleClick={this.handleClick}
                        handleDealChange={this.handleDealChange}
                        userfocus={this.state.userfocus}
                    />

                    <Action     
                        userfocus={this.state.userfocus}
                        handleFold={this.handleFold}
                        handleBet={this.handleBet}

                    />
                </div>
            :
                <div>loading</div>

        )
    }
};

export default Game;