import React, { useState } from 'react'
import{ Link } from 'react-router-dom'
import './CharacterList.scss'
import trash from '../../assets/icons/trash.svg'
import DeleteModal from '../../components/DeleteModal/DeleteModal'
// todo import context 

function CharacterList() {

const [show, setShow] = useState(false)

const handleDeleteModal = () => setShow(true)
const closeModal = () => setShow(false)


  return <div className='char-list'>
      <Link to='/characters/add' className='char-list__add'>+ NEW CHARACTER</Link>

        <Link to='/'>
      <div className='char-list__card'>
        <div className='char-list__card--left'>
              <div className='char-list__card--left-avatar' src="" alt=""></div>
              <h2 className='char-list__card--left-level'>LVL</h2>
              <h3 className='char-list__card--left-level-number'>7</h3>
        </div>

        <div className='char-list__card--middle'>
            <h3 className='char-list__card--middle-title'>Name:</h3>         <span className='char-list__card--middle-value'>Kami</span>
            <h3 className='char-list__card--middle-title'>Race:</h3>         <span className='char-list__card--middle-value'>Tabaxi</span>
            <h3 className='char-list__card--middle-title'>Class(es):</h3>    <span className='char-list__card--middle-value'>Warrior</span>
            <h3 className='char-list__card--middle-title'>Subclass:</h3>     <span className='char-list__card--middle-value'>Samurai</span>
        </div>

        <div className='char-list__card--right'>
            <button className='char-list__card--right-button' onClick={handleDeleteModal}><img className='char-list__card--right-image' src={trash} alt="trash icon" /></button>
            <DeleteModal closeModal={closeModal} show={show} />
        </div> 
      </div>
        </Link>

  </div>
}

export default CharacterList
