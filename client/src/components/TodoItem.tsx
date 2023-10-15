import React, { useState } from 'react'
import { todo } from './TodoList'

interface props{
    prop: todo,
    handleDelete: Function,
    handleToggle: Function
}

const TodoItem = ({prop, handleDelete, handleToggle}: props) => {

    // Deconstruct the prop, allowing for easier use.
    const {title, text, completed, id}: todo = prop

    return (
        <>
            <div className='todo-card'>
                <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                </div>
                <div>
                    <button onClick={() => handleToggle(prop)}>{completed ? "Complete" : "Todo"}</button>
                    <button onClick={() => handleDelete(id)}>Delete</button>
                </div>
            </div>
        </>
    )
}

export default TodoItem
