import React, { useState } from 'react'
import { todo } from './TodoList'

const TodoItem = ({prop, handleDelete, handleToggle}) => {

    // Save the todo as state, allowing the page to automatically refresh upon change.
    const {title, text, completed, id}: todo = prop

    // Handles the toggle between complete and incomplete.
    // const handleToggle = async () => {
    //     // Update to the db with the todo spread, with completed changed to the opposed value.
    //     await idbPromise('todos', 'put', {...todo, completed: !todo.completed} )
    //     setTodo({...todo, completed: !todo.completed})
        
    //     return;
    // }

    return (
        <div>
            <h3>{title}</h3>
            <p>{text}</p>
            <button onClick={() => handleToggle(prop)}>{completed ? "Complete" : "Todo"}</button>
            <button onClick={() => handleDelete(id)}>Delete</button>
        </div>
    )
}

export default TodoItem
