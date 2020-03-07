import React from "react";
import Header from "./Header.js";
import Event from "./Event.js";
import EventAction from "./EventAction.js";
import Menu from "./Menu.js";
import Money from "./Money.js";
import UserList from "./UserList.js";
import Chat from "./Chat.js";
import axios from 'axios';

class Game extends React.Component {

    constructor(props){
        super (props)
        this.state = {
            focus : false,
            showPopup : false,
            userDataisLoaded: false,
            users: [],
            potDataIsLoaded: false,
            potData: [],
            eventDataIsLoaded: false,
            eventData: [],
            user: [],
            curTime : new Date(),
            lastEventOxy : "",
            lastEventMoney :""
        }

        this.handleGiveChange = this.handleGiveChange.bind(this)
        this.handleLooseChange = this.handleLooseChange.bind(this)
        this.handleActionStatusChange = this.handleActionStatusChange.bind(this)
        this.handleMineCharacterStatChange = this.handleMineCharacterStatChange.bind(this)
        this.handleMineChange = this.handleMineChange.bind(this)
        this.getDuration = this.getDuration.bind(this)
        //this.handleActionTrigger = this.handleActionTrigger.bind(this)
        this.handleStartAction=this.handleStartAction.bind(this)
        this.handleValidateAction=this.handleValidateAction.bind(this)
        this.getOxygen = this.getOxygen.bind(this)
        this.handleGainOxygen = this.handleGainOxygen.bind(this)
        this.handleLooseOxygen = this.handleLooseOxygen.bind(this)
        this.setEventAsSeen = this.setEventAsSeen.bind(this)
        this.createGiveEvent = this.createGiveEvent.bind(this)
        this.createMineEvent = this.createMineEvent.bind(this)
        this.getRandomInt = this.getRandomInt.bind(this)
        this.handleLastEventChange = this.handleLastEventChange.bind(this)
        this.updateMineEvent = this.updateMineEvent.bind(this)
    }
    

    componentDidMount() {        
        //console.log(this.state)

        ///// Get Current event of current user///
        axios.get("/Krypton/BO_CURRENT/Model/RequestGet/getCurrentEvent.php?user=1")
        .then(res => {
            const mineEventData = res.data; 
                this.setState({
                    lastEventOxy: mineEventData===null ? 0 :mineEventData._amount_oxy,
                    lastEventMoney: mineEventData===null ? 0 :mineEventData._amount_money
                });
            //console.log(mineEventData)
        })
  
        // set interval to display duratino in real time
        setInterval( () => {
            this.setState({
                curTime : new Date()
            })
                ///// Get User list ///
                axios.get("/Krypton/BO_CURRENT/Model/RequestGet/getSpacemen.php")
                .then(res => {
                    const users = res.data; 
                    this.setState({
                        userDataisLoaded: true,
                        users: users
                    });
                })
        
                ///// Get Current only the current user///
                axios.get("/Krypton/BO_CURRENT/Model/RequestGet/getUser.php?user=" + this.props.user._name)
                .then(res => {
                    const user = res.data; 
                    this.setState({
                        user: user
                    });
                })
        
        
                ///// Get pot information ///
                axios.get("/Krypton/BO_CURRENT/Model/RequestGet/getPot.php")
                .then(res => {
                    const data = res.data; 
                    this.setState({
                        potDataIsLoaded: true,
                        potData: data._amount===null?"0":data._amount
                    });
                })
                ///// Get events information ///
                axios.get("/Krypton/BO_CURRENT/Model/RequestGet/getEvents.php")
                .then(res => {
                    const data = res.data; 
                    this.setState({
                        eventDataIsLoaded: true,
                        eventData: data
                    });
                })
            },1000)


            // this.state.eventData.map(
            //     function (item) {
            //         if (this.state.user._name  === item._target._name && item._is_viewed_by_target !== 1 ) {
            //             console.log("tototo")
            //             this.setState(prevState => ({
            //                 eventLenght: prevState.eventLenght + 1,
            //             }))
            //         }
            //     }
            // )

    }  

    ///// Handle increasing oxygene for the page ///
    handleGiveChange(e, f) {    

        this.setState(
            (prevState)=>{

                

                const newStateUsers = prevState.users.map(
                    item => {
                        if (item._id === e) {
                            //console.log(item._name + " trouve")
                            item._oxy = item._oxy + 1
                        }
                        //console.log(item._id)
                        return item
                    }
                )
                return({
                    users: newStateUsers
                })
            }
        )

    //console.log("target name = " + e)
    const form = new FormData()
    form.set('user_post', f)
    form.set('oxy_post', 1)   
    axios.post('/Krypton/BO_CURRENT/Model/RequestPost/postReceiveOxy.php', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        })
    }

    ///// Handle loosing oxygene for the page ///
    handleLooseChange() {
        // e : secondes of oxygen
        //console.log("function handle Loose Changed launched")
        //console.log(this.state.users)        

        this.setState(
            (prevState)=>{
                const newStateUsers = prevState.users.map(
                    item => {
                        if (item._name === this.state.user._name) {
                            item._oxy = item._oxy - 1
                        }
                        return item
                    } 
                )
                return newStateUsers
            }
        )

        const form = new FormData()
        form.set('user_post', this.state.user._name)
        form.set('oxy_post', 1)   
        axios.post('/Krypton/BO_CURRENT/Model/RequestPost/postRemoveOxy.php', form, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })

    }   

    ///// Handle change status last event ////
    handleLastEventChange() {
        //console.log("handleLastEventChange")
        // axios.get("/Krypton/BO_CURRENT/Model/RequestGet/getCurrentEvent.php?user=1")
        // .then(res => {
        //     const mineEventData = res.data; 
        //         this.setState({
        //             lastEvent: mineEventData
        //         });
        //     console.log(mineEventData)
        // })
    }

    ///// Handle Action status Change //////
    handleActionStatusChange(e, f){
        console.log("handleActionStatusChange launched e = " + e + " f = " + f)
        this.setState(
            (prevState)=>{
                const newStateUser = prevState.user
                newStateUser._is_performing_an_action = f
                const newStateUsers = prevState.users.map(
                    item => {
                        if (item._id === e) {
                            //console.log(item._name + " trouve")
                            item._is_performing_an_action = f
                        }
                        //console.log(item._id)
                        return item
                    }
                )
                return({
                    users: newStateUsers,
                    user: newStateUser
                })
            }
        )
        const form = new FormData()
        form.set('user_post', this.props.user)
        form.set('action_status_post', f)   
        axios.post('/Krypton/BO_CURRENT/Model/RequestPost/postUpdateActionProgressStatus.php', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
          })
    }

    ///// Update stat of character if mine /////
    handleMineCharacterStatChange(e) {
        //console.log("________" + this.props.user)
        this.setState(
            (prevState)=>{
                const newStateUsers = prevState.users.map(
                    item => {
                        if (item._name === this.state.user._name) {
                            item._money = item._money + e
                        }
                        return item
                    } 
                )
                return newStateUsers
            }
        )
        const form = new FormData()
        form.set('user_post', this.state.user._name)
        form.set('stat_money_post', e)   
        axios.post('/Krypton/BO_CURRENT/Model/RequestPost/postAddMoneyToUserStat.php', form, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })



        // ///// Get the amount of money collected /////
        // axios.get("/Krypton/BO_CURRENT/Model/RequestGet/getPot.php")
        // .then(res => {
        //   const items = res.data; 
        //   this.setState({
        //         potDataIsLoaded: true,
        //         potData: items._amount===null?"0":items._amount
        //     });
        // })
    }

    ///// Handle increasing amount of money for the page /////
    handleMineChange(e) {
        //console.log("function handle Mine Change launched by e = "+e)
        //console.log(this.state.potData)        
        this.setState(
            (prevState)=>{
                const newStatePotData = prevState.potData + e
                return({
                    potData: newStatePotData
                })
            }
        )
        const form = new FormData()
        form.set('pot_post', 1)
        form.set('money_post', e)   
        axios.post('/Krypton/BO_CURRENT/Model/RequestPost/postAddMoneyToPot.php', form, {
            headers: { 'Content-Type': 'multipart/form-data' },
            })
            
    }   

    ///// Function to return the duration from the next action time /////
    getDuration(e) {
        var moment = require('moment');
        //const dateConverted = moment(e).format('YYYY-MM-DD H:mm:ss')
        // let ms = moment(dateConverted,"YYYY-MM-DD H:mm:ss").diff(moment(this.state.curTime,"YYYY-MM-DD H:mm:ss"));
        let ms = moment(e).diff(moment())
        let d = moment.duration(ms);
        let duration = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
        // console.log(ms)
        if (ms<0) {
            duration = "ready"
        }
        // console.log("________" + this.state.user._name + " ------e ===" + e)
        // console.log(moment(dateConverted,"YYYY-MM-DD H:mm:ss"),"YYYY-MM-DD H:mm:ss")
        // console.log(moment(this.state.curTime).format('YYYY-MM-DD H:mm:ss'))
        //console.log(e)

        return(duration)
    }

    getOxygen(e, f) {
        //console.log(this.props.date_next_action)
        var moment = require('moment')
        // const dateConverted = moment(this.props.date_next_action).format('YYYY-MM-DD H:mm:ss')

        // get percentage completed (now - startDate) / (endDate - startDate)
        const date_no_more_oxy = moment(e);

        let diff = moment()
        diff = moment(date_no_more_oxy).diff(moment(diff))
        const d = moment.duration(diff);
        const s = moment.duration(d).asSeconds()
        // const s = Math.floor(d.asHours()) + moment.utc(diff).format("ss");
        //diff = moment(moment().add(moment(diff))).format('YYYY-MM-DD H:mm:ss')

        
        const max = 600
        let percentage_complete = s/max * 100;
        let result = Math.round((percentage_complete * 100) / 100); 
        result = result > 0 ? result : 0
        //console.log("hello " + f + " " + result)
        //console.log(d)

        return(result)
    }

    ///// Function to return the duration from the next action time /////
    addDuration(e) {
        var moment = require('moment')
        // const dateConverted = moment(e).format('YYYY-MM-DD H:mm:ss')
        // let ms = moment(dateConverted,"YYYY-MM-DD H:mm:ss").subtract(2, 'hours')
        const interval = moment.duration(5,"s")
        let newDate = moment()
        newDate = moment(newDate).add(interval)
        console.log(newDate)
        return(newDate)
    }

    handleGainOxygen (f, g, h) {
        // f = id target user
        // g = old date no more oxy
        // h = number of seconds of oxygen added
        var moment = require('moment')
        // const dateConverted = moment(e).format('YYYY-MM-DD H:mm:ss')
        // let ms = moment(dateConverted,"YYYY-MM-DD H:mm:ss").subtract(2, 'hours')
        
        // interval is the number of oxy given in seconds
        let interval = moment.duration(h,"s")
        let newDate = moment(g)

        newDate = moment(newDate).add(interval)
        // test if newDate est a plus du max (600) de maintenant. Si oui on laisse maintenant + max. Sinon on garde
        let diff_from_today = moment(newDate).diff(moment())
        //console.log(diff_from_today)
        if (diff_from_today > 600000) {
            const limit_from_now = moment.duration(600,"s")
            newDate = moment().add(limit_from_now)
        }
        /// Si le personnage n'a plus d'oxygene, on fainte et on lui donne a partir de mainteantn
        else if (diff_from_today < 0) {
            newDate = moment().add(interval)
        }

        newDate = moment(newDate).format('YYYY-MM-DD HH:mm:ss')
        // console.log(newDate)
        // console.log(f)
        // console.log(g)
        // return(newDate)
        // let diff = moment(newDate).diff(moment())
        // diff = diff > 600000 ? 60000 : diff
        // console.log(diff)

        this.setState(
            (prevState)=>{

                const newStateUser = prevState.user
                if (f === this.state.user._name) {
                    //console.log(item._name + " trouve")
                    newStateUser._date_no_more_oxy = newDate
                }

                const newStateUsers = prevState.users.map(
                    item => {
                        if (item._name === f) {
                            //console.log(item._name + " trouve")
                            item._date_no_more_oxy = newDate
                        }
                        //console.log(item._id)
                        return item
                    }
                )
                return({
                    users: newStateUsers,
                    user: newStateUser
                })
            }
        )
    

    //console.log("target name = " + e)
    const form = new FormData()
    form.set('user_post', f)
    form.set('date_post', newDate)   
    axios.post('/Krypton/BO_CURRENT/Model/RequestPost/postUpdateDateNoMoreOxy.php', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        })
    }

    handleLooseOxygen (h) {
        // f = id target user
        // g = old date no more oxy
        // h = number of seconds of oxygen added

        var moment = require('moment')
        // const dateConverted = moment(e).format('YYYY-MM-DD H:mm:ss')
        // let ms = moment(dateConverted,"YYYY-MM-DD H:mm:ss").subtract(2, 'hours')
        //console.log("loose")

        // interval is the number of oxy given in seconds
        let interval = moment.duration(h,"s")
        let newDate = moment(this.state.user._date_no_more_oxy)
        //console.log(this.state.user._date_no_more_oxy)

        newDate = moment(newDate).subtract(interval)
        // test if newDate est a moins de maintenant. Si oui on laisse maintenant. Sinon on garde
        let diff_from_today = moment(newDate).diff(moment())
        if (diff_from_today < 0) {
            newDate = moment()
        }

        let newDateFormat = moment(newDate).format('YYYY-MM-DD HH:mm:ss')
        console.log(newDateFormat)
        // console.log(newDate)
        // console.log(f)
        // console.log(g)
        // return(newDate)
        // let diff = moment(newDate).diff(moment())
        // diff = diff > 600000 ? 60000 : diff
        // console.log(diff)

        this.setState(
            (prevState)=>{
                

                const newStateUser = prevState.user
                newStateUser._date_no_more_oxy = newDateFormat

                const newStateUsers = prevState.users.map(
                    item => {
                        if (item._name === this.state.user._name) {
                            //console.log(item._name + " trouve")
                            item._date_no_more_oxy = newDateFormat
                        }
                        //console.log(item._id)
                        return item
                    }
                )
                return({
                    users: newStateUsers
                })
            }
        )
    

    //console.log("target name = " + e)
    const form = new FormData()
    form.set('user_post', this.state.user._name)
    form.set('date_post', newDateFormat)   
    axios.post('/Krypton/BO_CURRENT/Model/RequestPost/postUpdateDateNoMoreOxy.php', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        })
    }

    ///// Function set the timer /////
    handleStartAction(){
        //console.log('__handleStartAction__')
        // console.log(this.state.user)
        // console.log(parseInt(e))

        // const interval = moment.duration(2,"days")
        // const curTime2 = new Date()
        //const curTime2 = this.state.curTime

        var moment = require('moment');
        const newDate = moment(this.addDuration()).format('YYYY-MM-DD HH:mm:ss')

        //console.log(typeof((this.addDuration(newDate))))
        const e = 1
        this.setState(
            (prevState)=>{

                const newStateUser = prevState.user
                newStateUser._is_performing_an_action = e
                newStateUser._date_next_action =  newDate
                

                const newStateUsers = prevState.users.map(
                    user => {
                        if (user._name === this.state.user._name) {
                            user._date_next_action =  newDate
                            user._is_performing_an_action =  e
                        }
                        return user
                    } 
                )
                return ({
                    users: newStateUsers,
                    user: newStateUser
                })
            }
        )
        
        //refresh database
        const form = new FormData()
        form.set('user_post', this.state.user._name)
        form.set('action_status_post', e)   
        axios.post('/Krypton/BO_CURRENT/Model/RequestPost/postUpdateActionProgressStatus.php', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        })

        const form2 = new FormData()
        form2.set('user_post', this.state.user._name)
        form2.set('date_post', newDate)   
        axios.post('/Krypton/BO_CURRENT/Model/RequestPost/postupdateTimeNextAction.php', form2, {
        headers: { 'Content-Type': 'multipart/form-data' },
        })
        
    }
    
    handleValidateAction(){

        var moment = require('moment');
        const e = 0
        //console.log(typeof((this.addDuration(newDate))))

        //refresh state
        this.setState(
            (prevState)=>{

                const newStateUser = prevState.user
                newStateUser._is_performing_an_action = e

                const newStateUsers = prevState.users.map(
                    user => {
                        if (user._name === this.state.user._name) {
                            user._is_performing_an_action =  e
                        }
                        return user
                    } 
                )


                return ({
                    users: newStateUsers,
                    user: newStateUser
                })
            }
        )
        
        //refresh database
        const form = new FormData()
        form.set('user_post', this.state.user._name)
        form.set('action_status_post', e)   
        axios.post('/Krypton/BO_CURRENT/Model/RequestPost/postUpdateActionProgressStatus.php', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        })
        
    }

    setEventAsSeen(e) {  
        // this.setState({  
        //      showPopup: "!this.state.showPopup"  
        // });  
        this.setState(
            (prevState)=>{
                const newStateEventData = prevState.eventData.map(
                    item => {
                        if (item._id_event === e) {
                            item._is_viewed_by_target = 1
                        }
                        //console.log(item._id)
                        return item
                    }
                )
                return({
                    eventData: newStateEventData
                })
            }
        )
        
        
        const form = new FormData()
        form.set('event_post', e) 
        axios.post('/Krypton/BO_CURRENT/Model/RequestPost/postUpdateEventAsSeen.php', form, {
            headers: { 'Content-Type': 'multipart/form-data' },
            })
            
    }  

    createGiveEvent(e,f) {  
        // this.setState({  
        //      showPopup: "!this.state.showPopup"  
        // });  
        var moment = require('moment')
        var newDate = moment().format('YYYY-MM-DD HH:mm:ss')
        // console.log(newDate)
        // this.setState(prevState => ({
        //     eventData: [...prevState.eventData, {
        //         "_id_event": null,
        //         "_event_type": "give",
        //         "_user": {
        //             _id: e._id,
        //             _oxy: e._oxy,
        //             _money: e._money,
        //             _name: e._name,
        //             _date_next_action: e._date_next_action,
        //             _email: e._email,
        //             _password: e._password,
        //             _last_weather_seen_date: e._last_weather_seen_date,
        //             _is_performing_an_action: e._is_performing_an_action,
        //             _date_no_more_oxy: e._date_no_more_oxy},
        //         "_target": {
        //             _id: f._id,
        //             _oxy: f._oxy,
        //             _money: f._money,
        //             _name: f._name,
        //             _date_next_action: f._date_next_action,
        //             _email: f._email,
        //             _password: f._password,
        //             _last_weather_seen_date: f._last_weather_seen_date,
        //             _is_performing_an_action: f._is_performing_an_action,
        //             _date_no_more_oxy: f._date_no_more_oxy},
        //         "_amount": null,
        //         "_is_viewed_by_target": 0,
        //         "_mine_type": null,
        //         "_date_event": "2020-01-13 01:00:00",
        //         "_date_get": null
        //     }]
        //   }))
        
        const form = new FormData()
        form.set('id_user', e._id)
        form.set('event_type', 'give')
        form.set('id_target', f._id)
        form.set('amount_oxy', null)
        form.set('amount_money', null)
        form.set('is_viewed_by_target', 0)
        // form.set('mine_type', null)
        form.set('date_event', newDate)
        // form.set('date_get', null)
        axios.post('/Krypton/BO_CURRENT/Model/RequestPost/postAddEvent.php', form, {
            headers: { 'Content-Type': 'multipart/form-data' },
            })

        // this.setState(
        //     (prevState)=>{
        //         return({
        //             // eventData: "eventData"
        //         })
        //     }
        // )
        // const form = new FormData()
        // form.set('pot_post', 1)
        // form.set('money_post', 1)   
        // axios.post('/Krypton/BO_CURRENT/Model/RequestPost/postAddMoneyToPot.php', form, {
        //     headers: { 'Content-Type': 'multipart/form-data' },
        //     })
            
    }  


    getRandomInt(max) {
        return 1+Math.floor(Math.random() * Math.floor(max-1));
    }


    createMineEvent(e) {  
        // this.setState({  
        //      showPopup: "!this.state.showPopup"  
        // });  
        //console.log(e._id)
        const o = this.getRandomInt(100)
        const m = this.getRandomInt(100)
        var moment = require('moment')
        var newDate = moment().format('YYYY-MM-DD HH:mm:ss')
        // console.log(newDate)
        // this.setState(prevState => ({
        //     eventData: [...prevState.eventData, {
        //         "_id_event": null,
        //         "_event_type": "give",
        //         "_user": {
        //             _id: e._id,
        //             _oxy: e._oxy,
        //             _money: e._money,
        //             _name: e._name,
        //             _date_next_action: e._date_next_action,
        //             _email: e._email,
        //             _password: e._password,
        //             _last_weather_seen_date: e._last_weather_seen_date,
        //             _is_performing_an_action: e._is_performing_an_action,
        //             _date_no_more_oxy: e._date_no_more_oxy},
        //         "_target": {
        //             _id: f._id,
        //             _oxy: f._oxy,
        //             _money: f._money,
        //             _name: f._name,
        //             _date_next_action: f._date_next_action,
        //             _email: f._email,
        //             _password: f._password,
        //             _last_weather_seen_date: f._last_weather_seen_date,
        //             _is_performing_an_action: f._is_performing_an_action,
        //             _date_no_more_oxy: f._date_no_more_oxy},
        //         "_amount": null,
        //         "_is_viewed_by_target": 0,
        //         "_mine_type": null,
        //         "_date_event": "2020-01-13 01:00:00",
        //         "_date_get": null
        //     }]
        //   }))
        
        const form = new FormData()
        form.set('id_user', e._id)
        form.set('event_type', 'Mine')
        form.set('id_target', null)
        form.set('amount_oxy', o)
        form.set('amount_money', m)
        form.set('is_viewed_by_target', 0)
        // form.set('mine_type', null)
        form.set('date_event', newDate)
        // form.set('date_get', null)
        axios.post('/Krypton/BO_CURRENT/Model/RequestPost/postAddEvent.php', form, {
            headers: { 'Content-Type': 'multipart/form-data' },
            })

        // axios.get("/Krypton/BO_CURRENT/Model/RequestGet/getCurrentEvent.php?user=1")
        // .then(res => {
        //     const mineEventData = res.data; 
        //         this.setState({
        //             lastEvent: mineEventData
        //         });
        //     console.log(mineEventData)
        // })

        this.setState(
            (prevState)=>{
                return({
                    lastEventOxy: o,
                    lastEventMoney : m
                })
            }
        )
        // const form = new FormData()
        // form.set('pot_post', 1)
        // form.set('money_post', 1)   
        // axios.post('/Krypton/BO_CURRENT/Model/RequestPost/postAddMoneyToPot.php', form, {
        //     headers: { 'Content-Type': 'multipart/form-data' },
        //     })
            
    }  

    updateMineEvent(e) {  

        var moment = require('moment')
        var newDate = moment().format('YYYY-MM-DD HH:mm:ss')
        console.log(e)
        const form = new FormData()
        form.set('id_user', e)
        form.set('date_post', newDate)
        // form.set('date_get', null)
        axios.post('/Krypton/BO_CURRENT/Model/RequestPost/postUpdateMineEventAsGot.php', form, {
            headers: { 'Content-Type': 'multipart/form-data' },
            })
            
    } 

    render(){

        //console.log(this.state.eventData)

        // console.log(this.state.users)
        // console.log(this.state.user)
        // console.log(this.state.potData)


        //// Get date 
        //Note: In 2.4.0, the globally exported moment object was deprecated. It will be removed in next major release.
        //) https://momentjs.com/
        //
        //// Create a date name in the format YYYY-MM-DD H:mm:ss
        //const dateNow = moment(this.state.curTime).format('YYYY-MM-DD H:mm:ss')

        //// Convert date string form the db in order to make calculation
        // const dateConverted = moment(currentUser._date_next_action).format('YYYY-MM-DD H:mm:ss')
        // let ms = moment(dateConverted,"YYYY-MM-DD H:mm:ss").diff(moment(dateNow,"YYYY-MM-DD H:mm:ss"));
        // let d = moment.duration(ms);
        // let duration = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

        

        // const Events = this.state.eventData.map(
        //     item => <Event 
        //                 key={item._id_event}
        //                 text={item._id_event}  
        //                 closePopup={this.closePopup.bind(this)} 
        //             />
        // )


                ///// Display events ///
                const Events = this.state.eventData.map(
                    function (item) {
                        let data =[]

                        if (this.state.user._name  === item._target._name && item._is_viewed_by_target !== 1 ) {
                            data = <Event
                                key={item._id_event}
                                id={item._id_event} 
                                event={item}
                                user={this.state.user}
                                setEventAsSeen={this.setEventAsSeen} 
                                />
                        }
                        return(data)
                    }, this
                )
                
        return (
            <div>
                <Header user={this.props.user} handleUnLog={this.props.handleUnLog}/>
                <span>Focus app : {this.state.focus? "true" : "false"}</span>
                <br/>
                {/* <p>PotData : {this.state.potData}</p> */}

                {/* //// Event popup management //// */}
                {/* <button onClick={this.closePopup.bind(this)}> Click To Launch Popup</button>   */}
                <span>last event oxy {this.state.lastEventOxy} </span> 
                <span>last event money {this.state.lastEventMoney} </span>  

                {Events}
                {this.state.showPopup ?  
                <EventAction
                />  
                : null  
                }
                {/* /////////////////////////////// */}

                <Menu />
                <Money amount={this.state.potData}/>
                <UserList
                    //// Hydrate current user list
                    users={this.state.users}

                    //// Hydrate only current user name 
                    user={this.state.user}

                    //// Hydrate data status
                    userDataisLoaded = {this.state.userDataisLoaded}

                    //// Hydrate fonction to get duration
                    getDuration = {this.getDuration}
                    getOxygen = {this.getOxygen}

                    //// Hydrate mining function
                    handleMineChange={this.handleMineChange}
                    handleMineCharacterStatChange={this.handleMineCharacterStatChange}
                    handleActionStatusChange={this.handleActionStatusChange}
                    
                    //// Hydrate oxygene exchange function
                    handleLooseChange={this.handleLooseChange}
                    handleGiveChange={this.handleGiveChange}

                    //// Hydrate start action funtction
                    handleStartAction={this.handleStartAction}
                    handleValidateAction={this.handleValidateAction}

                    //// Hydrate function to oxygene in time
                    handleGainOxygen = {this.handleGainOxygen}
                    handleLooseOxygen = {this.handleLooseOxygen}

                    //// Events
                    createGiveEvent = {this.createGiveEvent}
                    createMineEvent = {this.createMineEvent}
                    lastEventOxy = {this.state.lastEventOxy}
                    lastEventMoney = {this.state.lastEventMoney}
                    handleLastEventChange = {this.handleLastEventChange}
                    updateMineEvent = {this.updateMineEvent}
                />
                <Chat />
             </div>

        )
    }
};

export default Game;