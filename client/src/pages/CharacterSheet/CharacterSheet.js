import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import eyeOpen from "../../assets/icons/open-eye.svg"
import eyeClose from "../../assets/icons/closed-eye.svg"
import { getCharacter, updateCharacter } from "../../Api"
import "./CharacterSheet.scss"
import { Hexagon } from "../../Character"
import logo from "../../assets/icons/dnd.svg"
import { useDebouncedCallback } from "use-debounce"

//to do onChange function for experience, level, hps, death saves

function CharacterSheet() {
  const [char, setCharDetails] = useState(null)

  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    getCharacter(params.id)
      .then(setCharDetails)
      .catch((err) => {
        navigate("/")
      })
  }, [navigate, params.id])

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
  const [_fail1, fail1button] = useCheckbox(false, "💀", "")
  const [_fail2, fail2button] = useCheckbox(false, "💀", "")
  const [_fail3, fail3button] = useCheckbox(false, "💀", "")
  const [_pass1, pass1button] = useCheckbox(false, "💚", "")
  const [_pass2, pass2button] = useCheckbox(false, "💚", "")
  const [_pass3, pass3button] = useCheckbox(false, "💚", "")
  const [_inspiration, inspirationButton] = useCheckbox(false, "💡", "")

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
          <div className="sheet__core--health">
            <div className="stat-block">
              <label className="stat-block__label" htmlFor="current_hp">
                Current HP
              </label>
              <input
                className="stat-block__input Hp"
                name="current_hp"
                id="current_hp"
                defaultValue={`${char.current_hp}/${char.max_hp}`}
              />
            </div>
            <div className="stat-block">
              <label className="stat-block__label" htmlFor="temp_hp">
                Temp HP
              </label>
              <input
                className="stat-block__input Hp"
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
                className="stat-block__input Hp"
                name="hit_die"
                id="hit_die"
                defaultValue={`${1 * char.level}d${char.class.hit_die}`}
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
          <div className="sheet__core--other">
            <div className="stat-block">
              <label className="stat-block__label" htmlFor="initiative">
                Initiative
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
                Speed
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
                defaultValue={`+${Math.ceil(2 + (0.25 * char.level - 1))}`}
              />
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
  const [attacks, setAttacks] = useState(char.attacks)

  const saveAttacksToDb = useDebouncedCallback((attacks) => {
    updateCharacter(char.id, {
      attacks: JSON.stringify(attacks),
    }).catch(console.error)
  }, 1000)

  useEffect(() => {
    saveAttacksToDb(attacks)
  }, [attacks, saveAttacksToDb])

  const emptyAttack = {
    name: "",
    bonus: "",
    damage: "",
  }

  function arrayUpdate(arr, index, func) {
    return [...arr.slice(0, index), func(arr[index]), ...arr.slice(index + 1)]
  }

  function arrayRemove(arr, index) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)]
  }

  function addAttack(e) {
    setAttacks([...attacks, emptyAttack])
  }

  function setAttack(index, field) {
    return (e) => {
      setAttacks(
        arrayUpdate(attacks, index, (attack) => {
          return {
            ...attack,
            [field]: e.target.value,
          }
        })
      )
    }
  }
  function removeAttack(index) {
    return (e) => {
      setAttacks(arrayRemove(attacks, index))
    }
  }

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
      {toggle ? (
        <>
          <div className="sheet__attacks">
            <div className="sheet__attacks--header">
              <div className="sheet__attacks--header-cell">Name</div>
              <div className="sheet__attacks--header-cell">Atk bonus</div>
              <div className="sheet__attacks--header-cell">Damage/Type</div>
              <div className="sheet__attacks--header-cell"></div>
            </div>
            {attacks.map((a, index) => (
              <div key={index} className="sheet__attacks--row">
                <div className="sheet__attacks--row-cell">
                  <input value={a.name} onChange={setAttack(index, "name")} />
                </div>
                <div className="sheet__attacks--row-cell">
                  <input value={a.bonus} onChange={setAttack(index, "bonus")} />
                </div>
                <div className="sheet__attacks--row-cell">
                  <input
                    value={a.damage}
                    onChange={setAttack(index, "damage")}
                  />
                </div>
                <div className="sheet__attacks--row-cell">
                  <button
                    type="button"
                    className="sheet__attacks--remove"
                    onClick={removeAttack(index)}
                    children="X"
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="sheet__attacks--add"
            onClick={addAttack}
            children="+"
          />
        </>
      ) : null}
    </div>
  )
}

function MiscData({ char }) {
  const [toggle, setToggle] = useState(true)
  const [eyecon, setEyecon] = useState(true)
  const [equipment, setEquipment] = useState(char.equipment.join("\n"))
  const [proficiencies, setProficiencies] = useState(
    char.proficiencies.join("\n")
  )
  const [traits, setTraits] = useState(char.traits.join("\n"))
  const [languages, setLanguages] = useState(char.languages.join("\n"))
  const [notes, setNotes] = useState(char.notes)
  // const [locked, setLocked] = useState(false)

  const saveMiscToDb = useDebouncedCallback((data) => {
    // setLocked(true)
    updateCharacter(char.id, {
      equipment: JSON.stringify(data.equipment.split("\n")),
      proficiencies: JSON.stringify(data.proficiencies.split("\n")),
      traits: JSON.stringify(data.traits.split("\n")),
      languages: JSON.stringify(data.languages.split("\n")),
      notes: data.notes,
    }).catch(console.error)
    // .finally(() => setLocked(false))
  }, 1000)

  useEffect(() => {
    saveMiscToDb({
      equipment,
      proficiencies,
      traits,
      languages,
      notes,
    })
  }, [equipment, languages, notes, proficiencies, saveMiscToDb, traits])

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
                onChange={(e) => setEquipment(e.target.value)}
                value={equipment}
              />
              <label className="sheet__misc--label">Proficiencies</label>
              <textarea
                name="proficiencies"
                className="sheet__misc--textarea"
                id="misc-proficiencies"
                cols="30"
                rows="10"
                onChange={(e) => setProficiencies(e.target.value)}
                value={proficiencies}
              />
              <label className="sheet__misc--label">Languages</label>
              <textarea
                name="languages"
                className="sheet__misc--textarea"
                id="misc-languages"
                cols="30"
                rows="10"
                onChange={(e) => setLanguages(e.target.value)}
                value={languages}
              />

              <label className="sheet__misc--label">Traits</label>
              <textarea
                name="traits"
                className="sheet__misc--textarea"
                id="miscTraits"
                cols="30"
                rows="10"
                onChange={(e) => setTraits(e.target.value)}
                value={traits}
              />
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
                onChange={(e) => setNotes(e.target.value)}
                value={notes}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
