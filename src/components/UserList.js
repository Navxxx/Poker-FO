import React from "react";
import User from "./User.js";
import ActionBar from "./ActionBar.js";

class UserList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            context : "normal",
            mode:"normal",
            userFocus: ""

        }
        this.handleClick = this.handleClick.bind(this)
        this.handleFocusListChange = this.handleFocusListChange.bind(this)
        this.unfocus = this.unfocus.bind(this)
    }
    

    ///// Focus a user on a click ///
    handleClick(e) {
        //console.log(e)
        this.setState({context:"userList", userFocus: e})
    }

    ///// Unfocus a user on a click ///
    unfocus() {
        //console.log("unfocus fonction lanched")
        this.setState({context:"normal", mode: "normal", userFocus: ""})
    }

    handleFocusListChange (e) {
        this.setState({context:"userList", userFocus: e})
        this.setState({mode:"freeOxy", userFocus: e})

    }

    render() {


        // console.log(this.props.users)
        // console.log(this.props.user)

        // ///// TEST get current user ///
        // const currentUser = this.props.users.filter(obj => obj._name === currentUserName)[0]

        ///// Display the current user in the first position ///
        const CurrentUser = this.props.users.map(
            function (item) {
                let data =[]
                if (this.props.user._name  === item._name) {
                    data = <User
                        //// Flag the user as current user
                        current='yes'
                        //// Hydrate the user with data
                        name={item._name}
                        user={this.props.user}
                        oxy={item._oxy}
                        money={item._money}
                        date_next_action={item._date_next_action}
                        date_no_more_oxy={item._date_no_more_oxy}
                        last_weather_seen_date={item.last_weather_seen_date}
                        is_performing_an_action={item._is_performing_an_action}
                        key={item._id} id={item._id}
                        //// Hydrate display fonctions from USERLIST
                        handleClick={this.handleClick}
                        userFocus={this.state.userFocus}
                        mode={this.state.mode}
                        unfocus={this.unfocus}
                        //// Hydrate data fonctions from Parent GAME
                        // Passing action update fonction
                        handleActionStatusChange={this.props.handleActionStatusChange}
                        // Passing mining fonction
                        handleMineChange={this.props.handleMineChange}
                        handleMineCharacterStatChange={this.props.handleMineCharacterStatChange}
                        // Passing oxygene exchange fonction
                        handleLooseChange={this.props.handleLooseChange}
                        //// Hydrate duration funtction
                        getDuration={this.props.getDuration}
                        getOxygen={this.props.getOxygen}
                        //// Hydrate start action funtction
                        handleStartAction={this.props.handleStartAction}
                        //// Hydrate function to oxygene in time
                        handleGainOxygen = {this.props.handleGainOxygen}
                        ////
                        handleValidateAction={this.props.handleValidateAction}
                        lastEventOxy = {this.props.lastEventOxy}
                        lastEventMoney = {this.props.lastEventMoney}
                        />
                }
                return(data)
            }, this
        )


        ///// Display other users ///
        const Users = this.props.users.map(
            function (item) {
                let data =[]
                if (this.props.user._name  !== item._name ) {
                    data = <User
                        //// Flag the user as not current user
                        current='no'
                        //// Hydrate the user with data
                        target={item}
                        name={item._name}
                        user={this.props.user}
                        oxy={item._oxy}
                        money={item._money}
                        date_next_action={item._date_next_action}
                        date_no_more_oxy={item._date_no_more_oxy}
                        last_weather_seen_date={item._last_weather_seen_date}
                        is_performing_an_action={item._is_performing_an_action}
                        key={item._id} id={item._id}
                        //// Hydrate display fonctions from USERLIST  
                        handleClick={this.handleClick}
                        userFocus={this.state.userFocus}
                        mode={this.state.mode}
                        unfocus={this.unfocus}
                        //// Hydrate data fonctions from Parent GAME
                        // Passing oxygene exchange fonction
                        handleGiveChange={this.props.handleGiveChange}
                        handleLooseChange={this.props.handleLooseChange}
                        //// Hydrate duration funtction
                        getDuration={this.props.getDuration}
                        getOxygen={this.props.getOxygen}
                        //// Hydrate function to oxygene in time
                        handleGainOxygen = {this.props.handleGainOxygen}
                        handleLooseOxygen = {this.props.handleLooseOxygen}
                        ////
                        handleValidateAction={this.props.handleValidateAction}
                        //// Event
                        createGiveEvent = {this.props.createGiveEvent}
                        lastEventOxy = {this.props.lastEventOxy}
                        lastEventMoney = {this.props.lastEventMoney}
                        />
                }
                return(data)
            }, this
        )


        return (
            <div>
                    {/* Mode : {this.state.mode} <br/>                   
                    contexte list : {this.state.context} <br/>
                    UserFocus : {this.state.userFocus} <br/>
                    <br/> */}
                {   //// If no users has been selected display user list title, else display the unfocus CTA
                    this.state.userFocus===""
                    ?
                        <div>___User list___<br/></div>
                    :   
                   <button onClick={()=>this.unfocus()}>cancel<br/></button>
                }  
                           
                {//// If user data has been loaded, display the action bar

                    this.props.userDataisLoaded===true && this.state.focus !== "true" && this.state.mode !=="freeOxy"
                    ?
                        <ActionBar
                            user={this.props.user}
                            handleMineChange={this.props.handleMineChange}
                            handleMineCharacterStatChange={this.props.handleMineCharacterStatChange}
                            users={this.props.users}
                            //// Hydrate duration funtction
                            getDuration={this.props.getDuration}
                            //// Hydrate start action funtction
                            handleStartAction={this.props.handleStartAction}
                            handleValidateAction={this.props.handleValidateAction}
                            //// Hydrate function to oxygene in time
                            handleGainOxygen = {this.props.handleGainOxygen}
                            handleLooseOxygen = {this.props.handleLooseOxygen}
                            //// Context of the ui
                            context={this.state.context}
                            handleFocusListChange={this.handleFocusListChange}
                            unfocus = {this.unfocus}
                            //// Event
                            createMineEvent = {this.props.createMineEvent}
                            lastEventOxy = {this.props.lastEventOxy}
                            lastEventMoney = {this.props.lastEventMoney}
                            handleLastEventChange = {this.props.handleLastEventChange}
                            updateMineEvent = {this.props.updateMineEvent}

                        />
                    :
                     <div>__________________
                    <br/></div>
                }      
        
                
                <br/>
                {CurrentUser}
                {Users}
            </div>
            )
    }
}

export default UserList;





