import React from "react";
import TodoItem from "./TodoItemPhase1.js"
import todoData from "../data/todoData.js"

// function Todo() {

//     const todoStyle = {
//         margin : "30px",
//         padding : "10px 10px 10px 10px",
//         border: "1px solid #000000"
//     }

//     const todoItem = todoData.map (
//         (item)=> {
//             return (
//                 <div>
//                 <TodoItem key={item.id} item={item} completed={item}/>
//                 </div>
//             )
//         }
//     )

//     return (
//         <div style={todoStyle}>
//             {todoItem}
//         </div>
//     )
// }


class Todo extends React.Component {

    render() {
        const todoItem = todoData.filter().map (
            (item)=> {
                return (
                    <div>
                    <TodoItem key={item.id} item={item} completed={item}/>
                    </div>
                )
            
            }
        )
        const todoItem2 = todoData.filter().map (
            (item)=> {
                return (
                    <div>
                    <TodoItem key={item.id} item={item} completed={item}/>
                    </div>
                )
            
        const todoStyle ={
            margin : "30px",
            padding : "10px 10px 10px 10px",
            border: "1px solid #000000"
        } 
        return(
        <div style={todoStyle}>
            {todoItem}
            {todoItem2}
        </div>
        ) 
    }
}

export default Todo;
