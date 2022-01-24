import React from 'react'
import './DeleteModal.scss'

function DeleteModal(props) {
    const { show, closeModal } = props

  return     <>
    <div className={show ? "delete__overlay" : "hide"}>
      <div className={show ? "delete" : "hide"}>
        <div className='delete__banner'>Delete</div>
        <button className='delete__x' onClick={closeModal}>X</button>
        <div className='delete__avatar'></div>
        <h1 className='delete__header'>Delete Kami, the level 7 samurai?</h1>
        <p className='delete__content'>Proceed to delete Kami.  This cannot be undone. </p>
        <div className='delete__buttons'>
        <button className='delete__accept'>Accept</button>
        <button className='delete__cancel' onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  </>
}

export default DeleteModal
