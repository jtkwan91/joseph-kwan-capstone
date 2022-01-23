import React from 'react'
import './CharacterList.scss'
import trash from '../../assets/icons/trash.svg'

function CharacterList() {

  return <div className='char-list'>
      <button className='char-list__add'>+ NEW CHARACTER</button>

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
            <button className='char-list__card--right-button'><img className='char-list__card--right-image' src={trash} alt="trash icon" /></button>
        </div>

      </div>

  </div>
}

export default CharacterList
