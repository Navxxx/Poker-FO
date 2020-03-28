import React from "react";



class User extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
        // this.handleChange = this.handleChange.bind(this)

    }

    // handleChange(event) {
    //     const {name, value} = event.target
    //     this.setState({[name]:value})
    // }



    render(){
        return (
            <div >
                <div onClick={()=>this.props.handleDealChange(this.props.id)}>
                    Dealer : {this.props.dealer} 
                </div>
                Name : {this.props.name} 
                <br/>
                Cave : {this.props.cash} 
                <br/>
                <div onClick={()=>this.props.handleClick(this.props.id)}>
                    {this.props.fold === 1
                        ?
                        <span>Fold</span>
                        :
                        <span>Mise : {this.props.chips}</span>
                    }
                </div>
                {/* Focus : {this.state.focus===false?"false":"true"} */}
                Focus : {this.props.userfocus._name===this.props.name?"yes":"no"}

                <br/>
                <br/>
             </div>

        )
    }
}

export default User;
