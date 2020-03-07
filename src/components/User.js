import React from "react";



class User extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            focus : false
        }
    }




    render() {
        // //console.log(this.props.date_next_action)
        // var moment = require('moment')
        // // const dateConverted = moment(this.props.date_next_action).format('YYYY-MM-DD H:mm:ss')

        // // get percentage completed (now - startDate) / (endDate - startDate)
        // const date_no_more_oxy = moment(this.props.date_no_more_oxy);

        // let diff = moment()
        // diff = moment(date_no_more_oxy).diff(moment(diff))
        // var d = moment.duration(diff);
        // var s = Math.floor(d.asHours()) + moment.utc(diff).format("ss");
        // //diff = moment(moment().add(moment(diff))).format('YYYY-MM-DD H:mm:ss')

        // const max = 100000
        // let percentage_complete = s / max * 100;
        // let percentage_rounded = (Math.round(percentage_complete * 100) / 100); 

        // console.log(percentage_rounded)

        // let percentage_complete = (now - startDate) / (endDate - startDate) * 100;
        // let percentage_rounded = (Math.round(percentage_complete * 100) / 100); 
        // percentage rounded to 2 decimal points
        // console.log(this.props.handleGainOxygen(this.props.id))

        // console.log(this.props.getOxygen(this.props.user._date_no_more_oxy, this.props.user._name))
        // console.log(this.props.getOxygen(this.props.user._date_no_more_oxy, this.props.user._name))

        return (
            <div id={this.props.id}>
                <div onClick={()=>this.props.handleClick(this.props.id)}>
                    <strong>{this.props.name}</strong>
                    <br/>
                    {/* Current : {this.props.current}
                    <br/> */}
                    {/* Oxygene : {this.props.oxy}
                    <br/> */}
                
                    Oxygen : {this.props.getOxygen(this.props.date_no_more_oxy, this.props.name)} %
                    <br/>
                    Collected money: {this.props.money}
                    {/* <br/>
                    Date No more oxygene : {this.props.date_no_more_oxy} */}

                    <br/>
                </div>
                
                {/* <br/> */}
                {/* action status : {this.props.is_performing_an_action}
                <br/> */}

                {/* Time next action : {moment(this.props.date_next_action).format('YYYY-MM-DD H:mm:ss')} */}
                {/* Time next action : {this.props.date_next_action} */}
                {/* <br/> */}
                {/* duration : {this.props.getOxygen(this.props.date_next_action)} */}
                {/* <br/> */}
                {
                ///// If the user is doing an action : show the time remaining
                // dateNow <= dateConverted
                // ?
                //     <span>Next action : {duration} <br/></span>
                // :
                //     ""
                }

                {   // Display more information on focus
                    this.props.userFocus===this.props.id
                    ?   <span>
                        Id : {this.props.id}

                        <br/>
                        {   //// For the current user display a seek CTA
                            this.props.current==='yes' 
                            ?
                                this.props.mode ==="freeOxy" 
                                ?
                                <div>
                                    <button onClick={()=>{
                                        //this.props.handleGiveChange(this.props.id, this.props.name)
                                        this.props.handleGainOxygen(this.props.name, this.props.date_no_more_oxy, this.props.lastEventOxy)
                                        this.props.handleValidateAction()
                                        this.props.unfocus()
                                        }                                    
                                    }>
                                            Take free oxygen
                                    </button>    
                                </div>
                                :
                                    ""
                            //// For the others user display a Give CTA
                            :   
                                
                                    this.props.mode ==="freeOxy" 
                                    ?
                                    <button onClick={()=>{
                                        //this.props.handleGiveChange(this.props.id, this.props.name)
                                        this.props.handleGainOxygen(this.props.name, this.props.date_no_more_oxy, this.props.lastEventOxy)
                                        this.props.handleValidateAction()
                                        this.props.createGiveEvent(this.props.user,this.props.target)
                                        this.props.unfocus()
                                        }                                    
                                    }>
                                            Give free oxygen
                                    </button>     
                                    :                        
                                    // 
                                    <button  disabled = {this.props.getOxygen(this.props.user._date_no_more_oxy, this.props.user._name)>10?false:true} onClick={()=>{
                                        this.props.handleGiveChange(this.props.id, this.props.name)
                                        this.props.handleLooseChange()
                                        this.props.handleGainOxygen(this.props.name, this.props.date_no_more_oxy, 60)
                                        this.props.handleLooseOxygen(60)
                                        this.props.createGiveEvent(this.props.user,this.props.target)
                                        }                                    
                                    }>
                                            Give your oxygen  
                                    </button>     
                        }
                        </span>
                    : ""
                }


                <br/>
                <br/>
            </div>
            )
    }
}

export default User;
