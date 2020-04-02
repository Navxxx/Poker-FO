import React from "react";
import User from "./User.js";

class UserList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {


        }

    }
    

    render() {
        //console.log(this.props.users)

        const Users = this.props.users.map(
            user => <User
                handleClick={this.props.handleClick}
                handleDealChange={this.props.handleDealChange}
                id={user._iduser}
                key={user._iduser}
                name={user._name}
                sitnumber={user._sitnumber}
                cash={user._cash}
                dealer={user._dealer}
                fold={user._fold}
                chips={user._chips}
                userfocus={this.props.userfocus}
                cards={this.props.cards}
                toggleCard={this.props.toggleCard}

            />
        )
        return (
            <div>


                
            {Users}

            </div>
            )
    }
}

export default UserList;





