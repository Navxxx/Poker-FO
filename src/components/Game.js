import React from "react";
import UserList from "./UserList.js";
import Action from "./Action.js";
import Header from "./Header.js";
import Footer from "./Footer.js";

import Deck from "./Deck.js";
import Results from "./Results.js";

import axios from 'axios';


const domain = process.env.REACT_APP_DOMAIN
// console.log(domain)

class Game extends React.Component {

    constructor(props){
        super (props)
        this.state = {
            userDataisLoaded : false,
            users: [],
            gains: [],
            userfocus: [],
            currentdealer: [],
            potData:[],
            cardsData : [],
            testInputfocus : 0
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleFold = this.handleFold.bind(this)
        this.handleBet = this.handleBet.bind(this)
        this.handleDealChange = this.handleDealChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleGainChange = this.handleGainChange.bind(this)
        this.handleGainChangeClear = this.handleGainChange.bind(this)
        this.handleGainClear = this.handleGainClear.bind(this)
        this.handleTakeAll = this.handleTakeAll.bind(this)
        this.handlePotClick = this.handlePotClick.bind(this)
        this.setInputfocus = this.setInputfocus.bind(this)
        this.validateResult = this.validateResult.bind(this)
        this.toggleCard = this.toggleCard.bind(this)
        this.toggleResults = this.toggleResults.bind(this)
        this.shuffle = this.shuffle.bind(this)


    }
    
    toggleResults(e) {
        // console.log("toogle")
        if (e===1) {

            this.setState(
                (prevState)=>{
                    let newStatepotData = prevState.potData
                    newStatepotData._window = 1
                    return({
                        potData: newStatepotData
                    })
                }
            )

            const form = new FormData()
            axios.post(domain+'postwindowon.php', form, {
            headers: { 'Content-Type': 'multipart/form-data' },
              })
        }

        else {
            this.setState(
                (prevState)=>{
                    let newStatepotData = prevState.potData
                    newStatepotData._window = 0
                    return({
                        potData: newStatepotData
                    })
                }
            )        
            const form = new FormData()
            axios.post(domain+'postwindowoff.php', form, {
            headers: { 'Content-Type': 'multipart/form-data' },
              })
        }

    }

    validateResult(){
        // console.log("validateResult")

        // give results to all players cash

        this.state.users.forEach(function(item){
            // console.log(item._gain)
            const form = new FormData()
            form.set('money_post', item._gain)
            form.set('player_post', item._iduser)
            axios.post(domain+'postwin.php', form, {
            headers: { 'Content-Type': 'multipart/form-data' },
              })
        });

        // clear results
        // const formr = new FormData()
        // axios.post(domain+'postcleargain.php', formr, {
        // headers: { 'Content-Type': 'multipart/form-data' },
        //   })

        //clear results state form
        this.setState(
            (prevState)=>{
                const newStateGains = prevState.gains.map(
                    (gain, i) => {
                        gain._gain = parseInt(0)
                        return gain
                    }
                )
                return({
                    gains: newStateGains
                })
            }
        )
        // clear pot
        const formd = new FormData()
        axios.post(domain+'postclearpot.php', formd, {
        headers: { 'Content-Type': 'multipart/form-data' },
            })
    }

    shuffle(){
        //clear visibility of cards
        const formb = new FormData()
        axios.post(domain+'postclearvisibility.php', formb, {
        headers: { 'Content-Type': 'multipart/form-data' },
            })

        //shuffle new deck
        const formc = new FormData()
        axios.post(domain+'postshuffle.php', formc, {
        headers: { 'Content-Type': 'multipart/form-data' },
            })



        // clear fold and bet
        const forme = new FormData()
        axios.post(domain+'postclearbetfold.php', forme, {
        headers: { 'Content-Type': 'multipart/form-data' },
            })
    }

    handleTakeAll(e) {
        // console.log("handleTakeAll"+e)
        // console.log(this.state.potData._amount)

        this.setState(
            (prevState)=>{
                const newStateGains = prevState.gains.map(
                    (gain, i) => {
                        if (i+1 === e) {
                            gain._gain = parseInt(this.state.potData._amount)
                        }
                        return gain
                    }
                )
                return({
                    gains: newStateGains
                })
            }
        )
    }

    handleChange(e,f) {
        // console.log(e)
        // console.log(f)
        // console.log(g)
        const {value} = e.target
        this.setState(
            (prevState)=>{
                const newStateGains = prevState.gains.map(
                    (gain, i) => {
                        if (i+1 === f) {
                            gain._gain = parseInt(value)
                        }
                        return gain
                    }
                )
                return({
                    gains: newStateGains
                })
            }
        )
    }

    handleGainClear() {
        // console.log("handleGainClear")
        this.setState(
            (prevState)=>{
                const newStateGains = prevState.gains.map(
                    (gain) => {
                            gain._gain = parseInt(0)
                        return gain
                    }
                )
                return({
                    gains: newStateGains
                })
            }
        )
    }

    handleGainChange(){
        // console.log("handleGainChange")

        this.state.gains.forEach(function(item){
            // console.log(item)
            const form = new FormData()
            form.set('gain_post', item._gain)
            form.set('player_post', item._iduser)
            axios.post(domain+'postgain.php', form, {
            headers: { 'Content-Type': 'multipart/form-data' },
              })
        });

    }

    handleGainChangeClear(){
        // console.log("handleGainChange")

        this.state.gains.forEach(function(item){
            // console.log(item)
            const form = new FormData()
            form.set('gain_post', 0)
            form.set('player_post', item._iduser)
            axios.post(domain+'postgain.php', form, {
            headers: { 'Content-Type': 'multipart/form-data' },
              })
        });

    }

    handleClick(e) {
        this.setState({focus:"true"})
        // console.log(this.state.users)
        this.state.users.map((user)=>{
            if (user._iduser === e )
            // console.log(i)

            return (
                this.setState({userfocus:user})
            )
        })

        //focus text
        this.setInputfocus(1);
    }

    toggleCard(e, f){
        
        f = parseInt(f)
        // console.log(f)
        // console.log(this.state.users[0]._sitnumber)

        // if the cards are from the current user or the deck, change its visibility
        if (f===this.state.users[0]._sitnumber || f===0 ){
            // console.log("good")

            this.setState(
                (prevState)=>{
                    const newStateCards = prevState.cardsData.map(
                        (card) => {
                            if (card._idcard === e) {

                                if (card._display === 0) {
                                    card._display = 1
                                }
                                else {
                                    card._display = 0
                                }
                            }
                            return card
                        }
                    )
                    return({
                        cardsData: newStateCards
                    })
                }
            )

            const form = new FormData()
            form.set('card_post', e)
            axios.post(domain+'posttogglecardvisibility.php', form, {
            headers: { 'Content-Type': 'multipart/form-data' },
            })
        }

    }

    handleFold(e) {
        this.setState(
            (prevState)=>{
                const newStateUsers = prevState.users.map(
                    (user, i) => {
                        if (i === e) {
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
        axios.post(domain+'postfold.php', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
          })
    }

    handleBet(e,f) {
        console.log("handleBet")
        this.setState(
            (prevState)=>{
                const newStateUsers = prevState.users.map(
                    (user, i) => {
                        if (i === f) {
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
        axios.post(domain+'postbet.php', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
          })

        const formb = new FormData()
        formb.set('player_post', e)
        axios.post(domain+'postunfold.php', form, {
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
        axios.post(domain+'postdealer.php', form, {
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
        axios.get(domain+'getlist.php?')
        .then(res => {
            const users = res.data; 
            this.setState({
                users: users,
                userfocus: users[0],
            });
            //// settings gains state according to users
            var gains = [];
            users.forEach(function(item){
                gains.push({_iduser : item._iduser, _name:item._name, _gain:0});
            });
            // console.log(users)
            // console.log(gains)
            this.setState({
                gains: gains,
            });
            // console.log(this.state.gains)

        })

        ///// Get cards list ///
        axios.get(domain+'getcards.php?')
        .then(res => {
            const cards = res.data; 
            this.setState({
                cardsData: cards
            });
        })

        ///// Get pot ///
        axios.get(domain+'getpot.php?')
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
            axios.get(domain+'getpot.php?')
            .then(res => {
                const potData = res.data; 
                this.setState({
                    potData: potData,
                });
            })
            ///// Get User list ///
            axios.get(domain+'getlistordered.php?usersitnumber='+this.props.user.sitnumber)
            .then(res => {
                const users = res.data; 
                this.setState({
                    users: users,
                    userDataisLoaded: true

                });
                
            })

            ///// Get cards list ///
            axios.get(domain+'getcards.php?')
            .then(res => {
                const cards = res.data; 
                this.setState({
                    cardsData: cards
                });
            })

        },3000)

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
    // console.log(this.state.cardsData)
        return (

            this.state.userDataisLoaded===true
            ?
                <div className="gamecontainer">
                    <Header
                        user={this.props.user}
                        handleUnLog={this.props.handleUnLog}
                        toggleResults = {this.toggleResults}
                        pot={this.state.potData}
                        handlePotClick={this.handlePotClick}
                    />
                    {/* {this.state.user} */}
                    {this.state.potData._window === 1 ?
                    <Results 
                    toggleResults = {this.toggleResults}
                    users={this.state.users}
                    gains={this.state.gains}
                    handleChange={this.handleChange}
                    handleGainChange={this.handleGainChange}
                    handleGainChangeClear={this.handleGainChange}

                    handleGainClear={this.handleGainClear}
                    handleTakeAll={this.handleTakeAll}
                    validateResult={this.validateResult}
                    shuffle={this.shuffle}
                      />
                    :
                    ""
                    }

                    <Deck
                        cards={this.state.cardsData}
                        toggleCard={this.toggleCard}
                      />

                    
                    <UserList
                        users={this.state.users}
                        handleClick={this.handleClick}
                        handleDealChange={this.handleDealChange}
                        userfocus={this.state.userfocus}
                        cards={this.state.cardsData}
                        toggleCard={this.toggleCard}

                    />

                    <Action     
                        testInputfocus={this.state.testInputfocus}
                        setInputfocus={this.setInputfocus}

                        userfocus={this.state.userfocus}
                        handleFold={this.handleFold}
                        handleBet={this.handleBet}

                    />
                    <Footer />
                </div>
            :
                <div>loading</div>

        )
    }
};

export default Game;