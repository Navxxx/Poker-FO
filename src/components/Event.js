import React from 'react';  
import './EventStyle.css';
import axios from 'axios';

class Event extends React.Component {  

    constructor(props){
        super (props)
        this.state = {
            eventLenght : 0,
        }
    }

componentDidMount() {        
    //console.log(this.props.user._name)
    ///// Get number of event to see ///
    axios.get("/Krypton/BO_CURRENT/Model/RequestGet/getNumberEventUnread.php?id_target=" + this.props.user._id)
    .then(res => {
        const events = res.data; 
        this.setState({
            eventLenght: events
        });
        // console.log(events)
    })
}   

render() {  
  return (  
        <div className='popup'>  
            <div className='popup_inner'>  
                <h1>Super !</h1>
                {this.props.event._user._name} vous a donné de l'oxygène à {this.props.event._date_event}
                <br/>
                <button onClick={()=>this.props.setEventAsSeen(this.props.id)}>close me</button> 
                <br/> 
                {this.state.eventLenght}
            </div>  
        </div>  
    );  
     }  
}  
  
export default Event;