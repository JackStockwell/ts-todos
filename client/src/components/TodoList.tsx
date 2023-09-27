import React, { useState } from 'react'

interface todo {
    id: number;
    title: string;
    text: string;
    completed: boolean;
}


const TodoList = () => {

    const todoState: todo[] = [
        {id: 1, title: "Test", text: "Test Todo", completed: false},
        {id: 2, title: "TWO", text: "Test TWO-DO", completed: true}
    ]

    const [todos, setTodos] = useState<todo[]>(todoState)

    const handleToggle = (id: number) => {
        todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed }
            }
            return todo;
        })
    }

    const handleOnSubmit = (e: any) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form)
        const value = Array.from(formData.entries())
        console.log(value)
        // Save values to new object.
        
    }

    return (
        <div>
            <div>
                <form className='form-wrap' id='text' onSubmit={handleOnSubmit}>
                    <label>
                        Todo title: 
                        <input type='text'></input>
                    </label>
                    <label>
                        What to do?
                        <textarea
                            name='text'
                            form='text'
                            
                        >

                        </textarea>
                        <button type="submit">Add Todo</button>
                    </label>
                </form>
            </div>
            <div>
                <ul>
                    {todos.map((todo) => (
                        <div 
                            key={todo.id} 
                        >
                            <p>
                                {todo.text}
                            </p>
                            <button
                                onClick={() => handleToggle(todo.id)} 
                                className={todo.completed ? "todo-comp-btn" : "todo-incomp-btn"}
                            >
                                {todo.text}
                            </button>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default TodoList
