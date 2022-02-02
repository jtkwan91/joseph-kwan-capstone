import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import eyeOpen from "../../assets/icons/open-eye.svg"
import eyeClose from "../../assets/icons/closed-eye.svg"
import { getCharacter } from "../../Api"
import "./CharacterSheet.scss"
import { Hexagon } from "../../Character"
import logo from "../../assets/icons/dnd.svg"

//to do onChange function for experience, level, hps, death saves

function CharacterSheet() {
  const [char, setCharDetails] = useState(null)

  const params = useParams()

  useEffect(() => {
    getCharacter(params.id)
      .then(setCharDetails)
      .catch((err) => {
        console.error(err.message)
      })
  }, [params.id])

  return (
    <div className="sheet">
      <div className="sheet__card">
        {char ? (
          <>
            {/* <pre>{JSON.stringify(char, null, 2)}</pre> */}
            <CharDetails char={char} />
            <Core char={char} />
            <Abilities char={char} />
            <WeaponsSpells char={char} />
            <MiscData char={char} />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}

export default CharacterSheet

function CharDetails({ char }) {
  const [toggle, setToggle] = useState(true)
  const [eyecon, setEyecon] = useState(true)

  return (
    <div className="sheet__details">
      {/* avatar, name, race, subrace, class, archetype, background, exp, lvl go
      here */}
      <h1 className="sheet__titles">Character</h1>
      {eyecon ? (
        <img
          className="toggle"
          src={eyeOpen}
          alt="eyecon"
          onClick={() => {
            setToggle(!toggle)
            setEyecon(!eyecon)
          }}
        />
      ) : (
        <img
          className="toggle"
          src={eyeClose}
          alt="eyecon"
          onClick={() => {
            setToggle(!toggle)
            setEyecon(!eyecon)
          }}
        />
      )}

      {toggle ? (
        <div className="sheet__details--container">
          <div className="sheet__details--avatar-container">
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
          </div>
          <div className="sheet__details--info">
            <div className="sheet__details--element">
              <label
                className="sheet__details--element-title"
                htmlFor="char-name"
              >
                Name:
              </label>
              <input
                className="sheet__details--element-input"
                defaultValue={char.name}
              />
            </div>

            <div className="sheet__details--element">
              <label
                className="sheet__details--element-title"
                htmlFor="char-race"
              >
                Race:
              </label>
              <input
                className="sheet__details--element-input"
                defaultValue={char.race.name}
              />
            </div>

            <div className="sheet__details--element">
              <label
                className="sheet__details--element-title"
                htmlFor="char-subrace"
              >
                Subrace:
              </label>
              <input
                className="sheet__details--element-input"
                defaultValue={char.subrace?.name ?? ""}
              />
            </div>

            <div className="sheet__details--element">
              <label
                className="sheet__details--element-title"
                htmlFor="char-class"
              >
                Class:
              </label>
              <input
                className="sheet__details--element-input"
                defaultValue={char.class.name}
              />
            </div>

            <div className="sheet__details--element">
              <label
                className="sheet__details--element-title"
                htmlFor="char-archetype"
              >
                Archetype:
              </label>
              <input
                className="sheet__details--element-input"
                defaultValue={char.archetype?.name ?? ""}
              />
            </div>

            <div className="sheet__details--element">
              <label
                className="sheet__details--element-title"
                htmlFor="char-background"
              >
                Background:
              </label>
              <input
                className="sheet__details--element-input"
                defaultValue={char.background?.name ?? ""}
              />
            </div>

            <div className="sheet__details--element">
              <label
                className="sheet__details--element-title"
                htmlFor="experience"
              >
                Experience:
              </label>
              <input
                className="sheet__details--element-input"
                defaultValue={char.exp}
              />
            </div>
            <div className="sheet__details--element">
              <label className="sheet__details--element-title" htmlFor="level">
                Level:
              </label>
              <input
                className="sheet__details--element-input"
                defaultValue={char.level}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function useCheckbox(initialState, yes, no) {
  const [checked, setChecked] = useState(initialState)
  return [
    checked,
    <div onClick={(e) => setChecked(!checked)} className="stat-block__input">
      {checked ? (
        <div className="checkbox__checked"> {yes} </div>
      ) : (
        <div className="checkbox__empty"> {no} </div>
      )}
    </div>,
  ]
}

function Core({ char }) {
  const [toggle, setToggle] = useState(true)
  const [eyecon, setEyecon] = useState(true)
  const [fail1, fail1button] = useCheckbox(false, "💀", "")
  const [fail2, fail2button] = useCheckbox(false, "💀", "")
  const [fail3, fail3button] = useCheckbox(false, "💀", "")
  const [pass1, pass1button] = useCheckbox(false, "💚", "")
  const [pass2, pass2button] = useCheckbox(false, "💚", "")
  const [pass3, pass3button] = useCheckbox(false, "💚", "")
  const [inspiration, inspirationButton] = useCheckbox(false, "💡", "")

  return (
    <div className="sheet__core">
      {/* AC, initiative, speed, current hp, max hp, temp hp, hit dice, death saves,
      proficiency bonus, inspiration go here */}
      <h1 className="sheet__titles">Core</h1>

      {eyecon ? (
        <img
          className="toggle"
          src={eyeOpen}
          alt="eyecon"
          onClick={() => {
            setToggle(!toggle)
            setEyecon(!eyecon)
          }}
        />
      ) : (
        <img
          className="toggle"
          src={eyeClose}
          alt="eyecon"
          onClick={() => {
            setToggle(!toggle)
            setEyecon(!eyecon)
          }}
        />
      )}
      {toggle ? (
        <div className="sheet__core--details">
          <div className="stat-block">
            <label className="stat-block__label" htmlFor="initiative">
              Initiative:
            </label>
            <input
              className="stat-block__input"
              id="initiative"
              defaultValue={0}
            />
          </div>
          <div className="stat-block">
            <label className="stat-block__label" htmlFor="inspiration">
              Inspiration
            </label>
            {inspirationButton}
          </div>
          <div className="stat-block">
            <label className="stat-block__label" htmlFor="speed">
              Speed:
            </label>
            <input
              className="stat-block__input"
              id="speed"
              defaultValue={char.speed}
            />
          </div>
          <div className="stat-block">
            <label className="stat-block__label" htmlFor="proficiency">
              Proficiency
            </label>
            <input
              className="stat-block__input"
              id="proficiency"
              defaultValue={`+${2}`}
            />
          </div>
          <div className="stat-block">
            <label className="stat-block__label" htmlFor="current_hp">
              Current HP
            </label>
            <input
              className="stat-block__input"
              name="current_hp"
              id="current_hp"
              defaultValue={char.current_hp}
            />
          </div>
          <div className="stat-block">
            <label className="stat-block__label" htmlFor="max_hp">
              Max HP
            </label>
            <input
              className="stat-block__input"
              name="max_hp"
              id="max_hp"
              defaultValue={char.max_hp}
            />
          </div>
          <div className="stat-block">
            <label className="stat-block__label" htmlFor="temp_hp">
              Temp HP
            </label>
            <input
              className="stat-block__input"
              name="temp_hp"
              id="temp_hp"
              defaultValue={char.temp_hp}
            />
          </div>
          <div className="stat-block">
            <label className="stat-block__label" htmlFor="hit_die">
              Hit Die
            </label>
            <input
              className="stat-block__input"
              name="hit_die"
              id="hit_die"
              defaultValue={char.class.hit_die}
            />
          </div>
          <div className="stat-block">
            <h3 className="stat-block__label">Death Saves</h3>
            <div className="death-saves">
              <label htmlFor="death_passes" className="death-saves__title">
                Fail
              </label>
              {fail1button}
              {fail2button}
              {fail3button}
            </div>
            <div className="death-saves">
              <label htmlFor="death_passes" className="death-saves__title">
                Pass
              </label>
              {pass1button}
              {pass2button}
              {pass3button}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function Abilities({ char }) {
  const [toggle, setToggle] = useState(true)
  const [eyecon, setEyecon] = useState(true)

  return (
    <div className="sheet__abilities">
      {/* ability scores, saving throws, skills, passive wisdom go here */}
      <h1 className="sheet__titles">Abilities</h1>
      {eyecon ? (
        <img
          className="toggle"
          src={eyeOpen}
          alt="eyecon"
          onClick={() => {
            setToggle(!toggle)
            setEyecon(!eyecon)
          }}
        />
      ) : (
        <img
          className="toggle"
          src={eyeClose}
          alt="eyecon"
          onClick={() => {
            setToggle(!toggle)
            setEyecon(!eyecon)
          }}
        />
      )}
      {toggle ? (
        <div className="sheet__abilities--details">
          <div className="create__abilities">
            <div className="create__abilities--hexes">
              <Hexagon
                label="STR"
                ability={char.abi_str}
                onChange={() => console.log("todo update: str")}
              />
              <Hexagon
                label="DEX"
                ability={char.abi_dex}
                onChange={() => console.log("todo update: dex")}
              />
              <Hexagon
                label="CON"
                ability={char.abi_con}
                onChange={() => console.log("todo update: con")}
              />
            </div>

            <div className="create__abilities--hexes">
              <Hexagon
                label="INT"
                ability={char.abi_int}
                onChange={() => console.log("todo update: int")}
              />
              <Hexagon
                label="WIS"
                ability={char.abi_wis}
                onChange={() => console.log("todo update: wis")}
              />
              <Hexagon
                label="CHA"
                ability={char.abi_cha}
                onChange={() => console.log("todo update: cha")}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function WeaponsSpells({ char }) {
  const [toggle, setToggle] = useState(true)
  const [eyecon, setEyecon] = useState(true)

  return (
    <div className="sheet__wep-spells">
      {/* weapons and spells go here */}
      <h1 className="sheet__titles">Weapons and Spells</h1>
      {eyecon ? (
        <img
          className="toggle"
          src={eyeOpen}
          alt="eyecon"
          onClick={() => {
            setToggle(!toggle)
            setEyecon(!eyecon)
          }}
        />
      ) : (
        <img
          className="toggle"
          src={eyeClose}
          alt="eyecon"
          onClick={() => {
            setToggle(!toggle)
            setEyecon(!eyecon)
          }}
        />
      )}
    </div>
  )
}

function MiscData({ char }) {
  const [toggle, setToggle] = useState(true)
  const [eyecon, setEyecon] = useState(true)

  return (
    <div className="sheet__misc">
      {/* features, proficiencies, languages, equipment list, personality etc. go
      here */}
      <h1 className="sheet__titles">Misc</h1>
      {eyecon ? (
        <img
          className="toggle"
          src={eyeOpen}
          alt="eyecon"
          onClick={() => {
            setToggle(!toggle)
            setEyecon(!eyecon)
          }}
        />
      ) : (
        <img
          className="toggle"
          src={eyeClose}
          alt="eyecon"
          onClick={() => {
            setToggle(!toggle)
            setEyecon(!eyecon)
          }}
        />
      )}
      {toggle ? (
        <div>
          <div className="sheet__misc--info">
            <div className="sheet__misc--lists">
              <label className="sheet__misc--label">Equipment</label>
              <textarea
                name="equipment"
                className="sheet__misc--textarea"
                id="misc-equipment"
                cols="30"
                rows="10"
              >
                {char.equipment.join("\n")}
              </textarea>
              <label className="sheet__misc--label">Proficiencies</label>
              <textarea
                name="proficiencies"
                className="sheet__misc--textarea"
                id="misc-proficiencies"
                cols="30"
                rows="10"
              >
                {char.proficiencies.join("\n")}
              </textarea>
              <label className="sheet__misc--label">Languages</label>
              <textarea
                name="languages"
                className="sheet__misc--textarea"
                id="misc-languages"
                cols="30"
                rows="10"
              >
                {char.languages.join("\n")}
              </textarea>

              <label className="sheet__misc--label">Traits</label>
              <textarea
                name="traits"
                className="sheet__misc--textarea"
                id="misctraits"
                cols="30"
                rows="10"
              >
                {char.traits.join("\n")}
              </textarea>
            </div>
            <div className="sheet__notes">
              <label className="sheet__notes--label" htmlFor="notes">
                Notes
              </label>
              <textarea
                className="sheet__notes--textarea"
                name="notes"
                id="notes"
                cols="30"
                rows="10"
              >
                {/* {char.notes} */}
              </textarea>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
