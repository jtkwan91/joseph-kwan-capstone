import React from "react"
import "./DeleteModal.scss"
import { delCharacter } from "../../Api"
import logo from "../../assets/icons/dnd.svg"

function DeleteModal({ show, closeModal, char, refresh }) {
  const onDelete = async (e) => {
    await delCharacter(char.id)
    closeModal()
    refresh()
  }

  return (
    <>
      <div className={show ? "delete__overlay" : "hide"}>
        <div className={show ? "delete" : "hide"}>
          <div className="delete__banner">Delete</div>
          <button className="delete__x" type="button" onClick={closeModal}>
            X
          </button>
          {char.avatar ? (
            <img
              className="delete__avatar"
              src={`http://localhost:8080/characters/${char.id}/avatar`}
              alt="avatar"
            />
          ) : (
            <img className="delete__avatar" src={logo} alt="avatar" />
          )}
          <h1 className="delete__header">
            Delete {char.name}, the level {char.level} {char.class.name}?
          </h1>
          <p className="delete__content">
            Proceed to delete {char.name}. This cannot be undone.
          </p>
          <div className="delete__buttons">
            <button className="delete__accept" type="button" onClick={onDelete}>
              Accept
            </button>
            <button
              className="delete__cancel"
              type="button"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteModal
