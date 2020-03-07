import React from 'react';  
import './EventStyle.css';

class EventAction extends React.Component {  


render() {  
  return (  
        <div className='popup'>  
            <div className='popup_inner'>  
                <h1>Bien joué</h1>
                Vous a gagné de l'oxygène
                <br/>
                <button>OK</button> 
                <br/> 
                {this.state.eventLenght}
            </div>  
        </div>  
    );  
     }  
}  
  
export default EventAction;