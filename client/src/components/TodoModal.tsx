import React, {Children, EventHandler, FormEventHandler, ReactEventHandler, useEffect, useRef, useState} from 'react'

interface props {
    openModal: boolean,
    closeModal: ReactEventHandler,
    handleOnSubmit: FormEventHandler,
}


const TodoModal = ({openModal, closeModal, handleOnSubmit}: props) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (openModal) {
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
        }
    }, [openModal])

    return (
            <dialog open={openModal} ref={dialogRef} onCancel={closeModal} className='comment-div'>
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
        </dialog>
    )
}

export default TodoModal