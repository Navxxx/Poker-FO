import React from "react";
import Userfield from "./Userfield.js";


class Results extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // usersgain : [],
            // gainloaddata :false
        }
    }

// componentDidMount() {
//     const usersgaintemp = [];

//     this.props.users.map(
//         user => {
//             usersgaintemp.push({"_idusergain" : user._iduser, "_amountgain" : 0 ,"_namegain" : user._name})
//         }
//     )
//     // usersgain.push({"toto" : 0})
//     console.log(usersgaintemp)
//     // console.log(this.props.users)  
//     this.setState({
//         usersgain: usersgaintemp,
//         gainloaddata:true,
//     });
//     //console.log(this.state.usersgain)  
// }
    
    render() {

        const Userfields = this.props.users.map(
            user => <Userfield
                id={user._iduser}
                key={user._iduser}
                name={user._name}
                sitnumber={user._sitnumber}
                // gain = {this.state.usersgain.find(function (usergain) {
                //     return usergain._idusergain === user._iduser;
                //   })}
                // gainloaddata = {this.state.gainloaddata}
                gain={user._gain}
            />
        )
        
        // console.log(this.state.usersgain)  

        return (
             <div>
                 Results : 
                {Userfields}
                <button>Validate</button>
            </div>
        )
    }
}

export default Results;


