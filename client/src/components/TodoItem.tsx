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
            <div className='item-card'>
                <h3>{title}</h3>
                <p>{text}</p>
                <button onClick={() => handleToggle(prop)}>{completed ? "Complete" : "Todo"}</button>
                <button onClick={() => handleDelete(id)}>Delete</button>
            </div>
        </>
    )
}

export default TodoItem
