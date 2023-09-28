import React, { useEffect, useState } from 'react'
import { idbPromise } from '../utils/helpers';

export type todo = {
    title: string,
    text: string, 
    completed: boolean;
    id?: number;
}


const TodoList = () => {

    const todoState: todo[] = [
        {title: "Test", text: "Test Todo", completed: false},
    ]

    const [todos, setTodos] = useState<todo[]>(todoState)

    const fetchData = async (): Promise<Array<todo> | string | undefined> => {

        try {
            const response: any = await idbPromise('todos', 'get')
            setTodos(response)
            return;

        } catch (err) {
            if (err) {
                return err.message
            }
        }
        
    }

    const handleToggle = (id: number | undefined) => {
        todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed }
            }
            return todo;
        })
    }

    // USE EFFECT, to retrieve data from indexDB, to be trigger when
    // Todo is created,
    // Upon page load.

    const handleOnSubmit = (e: any) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form)
        const title = formData.get('title')?.toString()
        const text = formData.get('text')?.toString()

        if (!title || !text) {
            alert('Title or Text is not a valid data type!')
            return;
        }

        const newTodo: todo = {
            title: title,
            text: text,
            completed: false
        }

        idbPromise('todos', 'add', newTodo);
    }

    useEffect(() => {
        fetchData();
    }, []);

    console.log(todos)

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
