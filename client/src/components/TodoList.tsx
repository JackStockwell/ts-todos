import React, { useState } from 'react'
import { idbPromise } from '../utils/helpers';

export type todo = {
    id: number;
    title: string,
    text: string, 
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

        const newTodo: todo = {
            id: 3,
            title: formData.get('title') as string,
            text: formData.get('text') as string,
            completed: false
        }

        idbPromise('todos', 'put', newTodo);

    }

    return (
        <div>
            <div>
                <form className='form-wrap' id='text' onSubmit={handleOnSubmit}>
                    <label>
                        Todo title: 
                        <input type='text' name='title'></input>
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
