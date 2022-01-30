import React, { useEffect, useState } from 'react'
import{ NavLink } from 'react-router-dom'
import './CharacterList.scss'
import trash from '../../assets/icons/trash.svg'
import DeleteModal from '../../components/DeleteModal/DeleteModal'
import { getCharacters } from '../../Api'
// todo import context 



function CharacterList() {
  
  const [characterList, setCharacterList] = useState([])

useEffect(() => {
  getCharacters()
  .then(setCharacterList)
  .catch((err) => {
    console.error(err.mesasage)
  })
}, [])

  return <div className='char-list'>
      <NavLink to='/add' className='char-list__add'>+ NEW CHARACTER</NavLink>
      {characterList.map(char =>
        <CharacterCard key={char.id} char={char} />
      )}
  </div>
}

export default CharacterList

function CharacterCard({char}) {
  const [show, setShow] = useState(false)
  const handleDeleteModal = () => setShow(true)
  const closeModal = () => setShow(false)

return(
  <NavLink to={`/${char.id}`} className='char-list__card'>
  <div className='char-list__card--left'>
    {char.avatar
      ? <img className='char-list__card--left-avatar' src={char.avatar} alt="avatar" />
      : <div className='char-list__card--left-avatar'></div>
    }
    <h2 className='char-list__card--left-level'>LVL</h2>
    <h3 className='char-list__card--left-level-number'>1</h3>
  </div>

  <div className='char-list__card--middle'>
      <span className='char-list__card--middle-value'>{char.name}</span>
      <span className='char-list__card--middle-value'>{char.race_name}</span>
      <span className='char-list__card--middle-value'>{char.class}</span>
  </div>

  <div className='char-list__card--right'>
      <button className='char-list__card--right-button' onClick={handleDeleteModal}><img className='char-list__card--right-image' src={trash} alt="trash icon" /></button>
      <DeleteModal closeModal={closeModal} show={show} char={char}/>
  </div>
</NavLink>
)

}