import React from "react";
import UserList from "./UserList.js";
import Action from "./Action.js";
import Header from "./Header.js";
import Pot from "./Pot.js";
import axios from 'axios';


const domain = process.env.REACT_APP_DOMAIN
// console.log(domain)

class Game extends React.Component {

    constructor(props){
        super (props)
        this.state = {
            userDataisLoaded : false,
            users: [],
            userfocus: [],
            currentdealer: [],
            potData:[],
            testInputfocus : 0,
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleFold = this.handleFold.bind(this)
        this.handleBet = this.handleBet.bind(this)
        this.handleDealChange = this.handleDealChange.bind(this)

        this.handlePotClick = this.handlePotClick.bind(this)
        this.setInputfocus = this.setInputfocus.bind(this)
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

        //focus text
        this.setInputfocus(1);
    }

    // filter(word => word.length > 6)

    handleFold(e) {
        this.setState(
            (prevState)=>{
                const newStateUsers = prevState.users.map(
                    (user, i) => {
                        if (i+1 === e) {
                            user._fold = 1;
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


    handleBet(e,f) {
        // console.log(e,f)
        this.setState(
            (prevState)=>{
                const newStateUsers = prevState.users.map(
                    (user, i) => {
                        if (i+1 === f) {
                            user._fold = 0;
                            user._chips = e
                        }
                        return user
                    }
                )
                return ({users:newStateUsers})
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

    handlePotClick() {

        // Clear state bets fold
        // console.log(this.state.users)
        let amounttotalbets = 0;
        this.setState(
            (prevState)=>{
                const newStateUsers = prevState.users.map(
                    (user, i) => {
                        // user._fold = 0;
                        amounttotalbets += parseInt(user._chips);
                        const cash = user._cash;
                        user._cash = cash - user._chips;
                        user._chips = 0;
                        return user
                    }
                )
                return({
                    users: newStateUsers
                })
            }
        )

        /// Update State Pot
        axios.get(domain+"getallbets.php")
        .then(res => {
            const totalbet = res.data; 
            // console.log(this.state.potData)

            this.setState(
                (prevState)=>{
                    let newStatePot = prevState
                    newStatePot.potData._amount = parseInt(prevState.potData._amount) + parseInt(amounttotalbets)
                    // console.log(newStatePot)

                    return({
                        potData: newStatePot.potData
                    })
                }
            )
        })



        // Call BE Fonction 4 add to pot
        const form = new FormData()
        // form.set('player_post', e)
        axios.post(domain+'postaddtopot.php', form, {
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
            ////// Get Pot
            axios.get("PokerBO/Model/Requests/getpot.php?")
            .then(res => {
                const potData = res.data; 
                this.setState({
                    potData: potData,
                });
            })
            ///// Get User list ///
            axios.get("PokerBO/Model/Requests/getlistordered.php?usersitnumber="+this.props.user.sitnumber)
            .then(res => {
                const users = res.data; 
                this.setState({
                    users: users,
                    userDataisLoaded: true

                });
                
            })

        },5000)

    }  

    setInputfocus(e){
        this.setState({
            testInputfocus : e
        }) 
    }

    render(){
        // console.log(this.state.users)
    // console.log(this.state.testInputfocus)
    // console.log(this.state.potData)

        return (

            this.state.userDataisLoaded===true
            ?
                <div>
                    <Header user={this.props.user} handleUnLog={this.props.handleUnLog}/>
                    {/* {this.state.user} */}
                    <Pot
                        pot={this.state.potData}
                        handlePotClick={this.handlePotClick}
                    />
                    <UserList
                        users={this.state.users}
                        handleClick={this.handleClick}
                        handleDealChange={this.handleDealChange}
                        userfocus={this.state.userfocus}
                    />

                    <Action     
                        testInputfocus={this.state.testInputfocus}
                        setInputfocus={this.setInputfocus}

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