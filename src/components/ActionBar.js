import React from "react";



class User extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
        }

    }

    
    render() {
        //console.log(this.props.user._is_performing_an_action === "1")
        
        // console.log(this.props.user._is_performing_an_action)
            
        // now = moment();
        // startDate = moment(creation_date);
        // endDate = moment(completion_date);

        // var percentage_complete = (now - startDate) / (endDate - startDate) * 100;
        // var percentage_rounded = (Math.round(percentage_complete * 100) / 100); 
        // console.log(this.props.getCurrentMineData)
        // console.log(this.props.lastEvent._amount_oxy)
        // console.log(this.props.lastEvent._amount_money)

        return (
            <div>
                __________________
                <br/>
                duration : {this.props.getDuration(this.props.user._date_next_action)}
                {/* duration : {this.props.user._date_next_action} */}
                {/* {console.log(                    this.props.user._is_performing_an_action === "1" &&                         this.props.getDuration(this.props.user._date_next_action) === "ready")} */}
                <br/>

                { //// If an action is in progress show the button
                    //parseInt(this.props.user._is_performing_an_action) === 1
                    this.props.user._is_performing_an_action == "1" && this.props.getDuration(this.props.user._date_next_action) === "ready"
                    ?   
                        <div>
                            <button onClick={()=>{
                                /// update pot change`
                                // const number = this.props.getCurrentMineData()
                                this.props.handleMineChange(this.props.lastEventMoney)
                                /// set users status
                                this.props.handleMineCharacterStatChange(this.props.lastEventMoney)
                                /// set action status to 0 : available
                                this.props.handleValidateAction()
                                this.props.updateMineEvent(this.props.user._id)

                                }                                    
                            }
                        >
                            Get Money for the pot
                        </button>
                        <button onClick={()=>{
                                /// update context of the ui to choose
                                this.props.handleFocusListChange(this.props.user._id)

                                }                                    
                            }
                        >
                            Get free oxygen
                        </button>

                        </div>
                    : 
                        // Autre conditions
                        this.props.getDuration(this.props.user._date_next_action) === "ready"
                        ?
                            <button onClick={()=>{
                                    /// set action status to 1 : inprogress
                                    this.props.handleStartAction()
                                    this.props.createMineEvent(this.props.user)
                                    this.props.handleLastEventChange()
                                    this.props.unfocus()

                                    }                                    
                                }
                            >
                                Mine
                            </button>
                            
                        : 
                            <span>wait</span>  
                }
                <br/>
                
            </div>
            )
    }
}

export default User;
