import React, { EventHandler, FormEventHandler, ReactEventHandler, useEffect, useRef, useState} from 'react'

interface props {
    openModal: boolean,
    closeModal: any,
    handleOnSubmit: FormEventHandler,
}


const TodoModal = ({openModal, closeModal, handleOnSubmit}: props) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (openModal) {
            dialogRef.current?.showModal()
        } else if (!openModal) {
            dialogRef.current?.close()
        }
    }, [openModal])

    return (
        <dialog ref={dialogRef} onCancel={closeModal}>
            <section className='comment-div'>
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
                <button onClick={closeModal}>Close</button>
            </section>
        </dialog>
    )
}

export default TodoModal