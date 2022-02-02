import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./CharacterList.scss"
import trash from "../../assets/icons/trash.svg"
import DeleteModal from "../../components/DeleteModal/DeleteModal"
import { getCharacters } from "../../Api"
import logo from "../../assets/icons/dnd.svg"
// todo import context

function CharacterList() {
  const [characterList, setCharacterList] = useState([])
  const [timestamp, setTimestamp] = useState(Date.now())

  useEffect(() => {
    getCharacters()
      .then(setCharacterList)
      .catch((err) => {
        console.error(err.message)
      })
  }, [timestamp])

  const refresh = () => {
    setTimestamp(Date.now())
  }

  return (
    <div className="char-list">
      <Link to="/add" className="char-list__add">
        + NEW CHARACTER
      </Link>
      {characterList.map((char) => (
        <CharacterCard key={char.id} char={char} refresh={refresh} />
      ))}
    </div>
  )
}

export default CharacterList

function CharacterCard({ char, refresh }) {
  const [show, setShow] = useState(false)
  const openModal = (e) => {
    setShow(true)
    e.preventDefault()
    e.stopPropagation()
  }
  const closeModal = (e) => {
    setShow(false)
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <Link className="char-list__card" to={`/${char.id}`}>
      {/* <pre>{JSON.stringify(char, null, 2)}</pre> */}
      <div className="char-list__card--left">
        {char.avatar ? (
          <img
            className="char-list__card--left-avatar"
            src={`http://localhost:8080/characters/${char.id}/avatar`}
            alt="avatar"
          />
        ) : (
          <img
            className="char-list__card--left-avatar"
            src={logo}
            alt="avatar"
          />
        )}
        <h2 className="char-list__card--left-level">LVL</h2>
        <h3 className="char-list__card--left-level-number">{char.level}</h3>
      </div>

      <div className="char-list__card--middle">
        <h3 className="char-list__card--middle-value">{char.name}, </h3>
        <h3 className="char-list__card--middle-value">the {char.race.name}</h3>
        <h3 className="char-list__card--middle-value">{char.class.name}</h3>
      </div>

      <div className="char-list__card--right">
        <button className="char-list__card--right-button" onClick={openModal}>
          <img
            className="char-list__card--right-image"
            src={trash}
            alt="trash icon"
          />
        </button>
        <DeleteModal
          closeModal={closeModal}
          show={show}
          char={char}
          refresh={refresh}
        />
      </div>
    </Link>
  )
}
