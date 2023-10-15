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
            <section className='modal'>
                <form className='form-wrap' id='text' onSubmit={handleOnSubmit}>
                    <label className='flex col gap-1'>
                        Todo title: 
                        <input className='t-box' placeholder='Title' type='text' name='title'></input>
                    </label>
                    <label className='flex col gap-1'>
                        What to do?
                        <textarea
                            className='t-box'
                            name='text'
                            form='text'
                        >
                        </textarea>
                        <button type="submit" onClick={closeModal}>Add Todo</button>
                    </label>
                </form>
                <button onClick={closeModal}>Cancel</button>
            </section>
        </dialog>
    )
}

export default TodoModal