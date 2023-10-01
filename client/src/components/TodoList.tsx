import React, { useEffect, useState } from 'react'
import { idbPromise } from '../utils/helpers';

import TodoItem from './TodoItem'

export type todo = {
    title: string,
    text: string, 
    completed: boolean;
    id?: number;
}


const TodoList = () => {

    // Array of todos, what is parsed to render the items.
    const [todos, setTodos] = useState<todo[]>()

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
    // Handles new todo submission, takes the target, converts to form data
    // Creates a new todo, adds it it state.
    const handleOnSubmit = async (e: any) => {
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

        await idbPromise('todos', 'add', newTodo);
        setTodos([...(todos ?? []), newTodo])
    }

    // Handles the toggle between complete and incomplete.
    const handleToggle = async (todoProp: todo) => {
        // Update to the db with the todo spread, with completed changed to the opposed value.
        const newTodos = todos?.map((todo) => {
            if (todo.id === todoProp.id) {
                return {...todo, completed: !todo.completed};
            } else {
                return todo;
            } 
        });

        await idbPromise('todos', 'put', {...todoProp, completed: !todoProp.completed});

        setTodos(newTodos)

        return;
    }

    // Handles the deletion of the todo.
    const handleDelete = async (id: todo['id']) => {
        setTodos(todos?.filter((todo) => {
            return todo.id !== id
        }));

        await idbPromise('todos', 'delete', undefined, id);
    }

    useEffect(() => {
        fetchData();
    }, []);

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
                {todos?.map((todo, index) => {
                    return <TodoItem prop={todo} handleDelete={handleDelete} handleToggle={handleToggle} key={index} />
                })}
            </div>
        </div>
    )
}

export default TodoList
