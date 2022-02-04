import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDebouncedCallback } from "use-debounce"
import "./CharacterSheet.scss"
import { EyeOpen, EyeClose } from "../../components/Icons"
import logo from "../../assets/icons/dnd.svg"
import { avatarUrl, getCharacter, updateCharacter } from "../../Api"
import { Hexagon } from "../../Character"

// generics
function arrayUpdate(arr, index, func) {
  return [...arr.slice(0, index), func(arr[index]), ...arr.slice(index + 1)]
}

function arrayRemove(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)]
}

// hooks
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

function CharacterSheet() {
  const [char, setCharDetails] = useState(null)
  const navigate = useNavigate()
  const params = useParams()

  /* this is the reusable persist to db function */
  /* note we pass it persit={persist} to all of the sub-sheets below */
  const persist = useDebouncedCallback((data) => {
    updateCharacter(char.id, data).catch(console.error)
  }, 1000)

  /* if the user navigates away or closes the character page before the persist runs,
  we should wait for it to finish. this effect does exactly that. todo: read the
  use-debounce docs for more information about that. */
  useEffect(() => {
    return () => persist.flush()
  }, [persist])

  /* fetch character data or go back to character list */
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
            <CharDetails char={char} persist={persist} />
            <Core char={char} persist={persist} />
            <Abilities char={char} persist={persist} />
            <WeaponsSpells char={char} persist={persist} />
            <MiscData char={char} persist={persist} />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}

export default CharacterSheet

function CharDetails({ char, persist }) {
  const [name, setName] = useState(char.name)
  const [exp, setExp] = useState(char.exp)
  const [level, setLevel] = useState(char.level)

  useEffect(() => {
    persist({
      name: name,
      exp: exp,
      level: level,
    })
  }, [
    persist,
    name,
    exp,
    level,
  ]) /* run the effect any time one of these changes */

  return (
    <ToggleBox>
      {
        (visible) =>
          visible ? (
            <div className="sheet__details--container">
              <div className="sheet__details--avatar-container">
                {char.avatar ? (
                  <img
                    className="char-list__card--left-avatar"
                    src={avatarUrl(char.id)}
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="sheet__details--element">
                  <label
                    className="sheet__details--element-title"
                    htmlFor="char-race"
                  >
                    Race:
                  </label>
                  {/* todo: maybe use race <select> and use char.race.index as value */}
                  <input
                    className="sheet__details--element-input"
                    value={char.race.name}
                    disabled
                  />
                </div>

                <div className="sheet__details--element">
                  <label
                    className="sheet__details--element-title"
                    htmlFor="char-subrace"
                  >
                    Subrace:
                  </label>
                  {/* todo: maybe use subrace <select> and use char.subrace.index as value */}
                  <input
                    className="sheet__details--element-input"
                    value={char.subrace?.name ?? ""}
                    disabled
                  />
                </div>

                <div className="sheet__details--element">
                  <label
                    className="sheet__details--element-title"
                    htmlFor="char-class"
                  >
                    Class:
                  </label>
                  {/* todo: maybe use class <select> and use char.class.index as value */}
                  <input
                    className="sheet__details--element-input"
                    value={char.class.name}
                    disabled
                  />
                </div>

                <div className="sheet__details--element">
                  <label
                    className="sheet__details--element-title"
                    htmlFor="char-archetype"
                  >
                    Archetype:
                  </label>
                  {/* todo: maybe use archetype <select> and use char.archetype.index as value */}
                  <input
                    className="sheet__details--element-input"
                    value={char.archetype?.name ?? ""}
                    disabled
                  />
                </div>

                <div className="sheet__details--element">
                  <label
                    className="sheet__details--element-title"
                    htmlFor="char-background"
                  >
                    Background:
                  </label>
                  {/* todo: maybe use background <select> and use char.background.index as value */}
                  <input
                    className="sheet__details--element-input"
                    value={char.background?.name ?? ""}
                    disabled
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
                    value={exp}
                    onChange={(e) => setExp(e.target.value)}
                  />
                </div>
                <div className="sheet__details--element">
                  <label
                    className="sheet__details--element-title"
                    htmlFor="level"
                  >
                    Level:
                  </label>
                  <input
                    className="sheet__details--element-input"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                  />
                </div>
              </div>
            </div>
          ) : null /* todo: replace null with the "abbreviated" display of this sub sheet */
      }
    </ToggleBox>
  )
}

function Core({ char, persist }) {
  const [tempHp, setTempHp] = useState(char.temp_hp)
  const [speed, setSpeed] = useState(char.speed)
  const [hitdie, setHitdie] = useState(char.hitdie)
  const [_fail1, fail1button] = useCheckbox(false, "💀", "")
  const [_fail2, fail2button] = useCheckbox(false, "💀", "")
  const [_fail3, fail3button] = useCheckbox(false, "💀", "")
  const [_pass1, pass1button] = useCheckbox(false, "💚", "")
  const [_pass2, pass2button] = useCheckbox(false, "💚", "")
  const [_pass3, pass3button] = useCheckbox(false, "💚", "")
  const [_inspiration, inspirationButton] = useCheckbox(false, "💡", "")

  useEffect(() => {
    persist({
      temp_hp: tempHp,
      speed: speed,
      hitdie: hitdie,
    })
  }, [
    persist,
    tempHp,
    speed,
    hitdie,
  ]) /* run persist any time one of these changes */

  return (
    <ToggleBox title="Core">
      {
        (visible) =>
          visible ? (
            <div className="sheet__core--details">
              <div className="sheet__core--health">
                <div className="stat-block">
                  <label className="stat-block__label" htmlFor="current_hp">
                    Current HP
                  </label>
                  {/* this is derived (computed) state and probably shouldn't allow change */}
                  {/* maybe make current_hp and max_hp separate fields? */}
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
                    value={tempHp}
                    onChange={(e) => setTempHp(e.target.value)}
                  />
                </div>
                <div className="stat-block">
                  <label className="stat-block__label" htmlFor="hit_die">
                    Hit Die
                  </label>
                  {/* this is derived (computed) state and should not be modified directly */}
                  {/* maybe make this field disabled so it cannot be changed */}
                  <input
                    className="stat-block__input Hp"
                    name="hit_die"
                    id="hit_die"
                    value={hitdie}
                    onChange={(e) => setHitdie(e.target.value)}
                  />
                </div>
                <div className="stat-block">
                  <h3 className="stat-block__label">Death Saves</h3>
                  <div className="death-saves">
                    <label
                      htmlFor="death_passes"
                      className="death-saves__title"
                    >
                      Fail
                    </label>
                    {fail1button}
                    {fail2button}
                    {fail3button}
                  </div>
                  <div className="death-saves">
                    <label
                      htmlFor="death_passes"
                      className="death-saves__title"
                    >
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
                    value={speed}
                    onChange={(e) => setSpeed(e.target.value)}
                  />
                </div>
                <div className="stat-block">
                  <label className="stat-block__label" htmlFor="proficiency">
                    Proficiency
                  </label>
                  {/* this is derived (computed) state and should not be modified directly */}
                  {/* consider making this input disabled so it cannot be changed by the user */}
                  <input
                    className="stat-block__input"
                    id="proficiency"
                    defaultValue={`+${Math.ceil(2 + (0.25 * char.level - 1))}`}
                  />
                </div>
              </div>
            </div>
          ) : null /* todo: replace null with the "abbreviated" display of this sub sheet */
      }
    </ToggleBox>
  )
}

function Abilities({ char, persist }) {
  const [str, setStr] = useState(char.abi_str)
  const [dex, setDex] = useState(char.abi_dex)
  const [con, setCon] = useState(char.abi_con)
  const [int, setInt] = useState(char.abi_int)
  const [wis, setWis] = useState(char.abi_wis)
  const [cha, setCha] = useState(char.abi_cha)

  useEffect(() => {
    persist({
      abi_str: str,
      abi_dex: dex,
      abi_con: con,
      abi_int: int,
      abi_wis: wis,
      abi_cha: cha,
    })
  }, [persist, str, dex, con, int, wis, cha])

  return (
    <ToggleBox>
      {
        (visible) =>
          visible ? (
            <div className="sheet__abilities--details">
              <div className="create__abilities">
                <div className="create__abilities--hexes">
                  <Hexagon
                    label="STR"
                    ability={str}
                    onChange={(e) => setStr(e.target.value)}
                  />
                  <Hexagon
                    label="DEX"
                    ability={dex}
                    onChange={(e) => setDex(e.target.value)}
                  />
                  <Hexagon
                    label="CON"
                    ability={con}
                    onChange={(e) => setCon(e.target.value)}
                  />
                </div>

                <div className="create__abilities--hexes">
                  <Hexagon
                    label="INT"
                    ability={int}
                    onChange={(e) => setInt(e.target.value)}
                  />
                  <Hexagon
                    label="WIS"
                    ability={wis}
                    onChange={(e) => setWis(e.target.value)}
                  />
                  <Hexagon
                    label="CHA"
                    ability={cha}
                    onChange={(e) => setCha(e.target.value)}
                  />
                </div>
              </div>
            </div>
          ) : null /* todo: replace null with the "abbreviated" display of this sub sheet */
      }
    </ToggleBox>
  )
}

function WeaponsSpells({ char, persist }) {
  const [attacks, setAttacks] = useState(char.attacks)

  useEffect(() => {
    persist({
      attacks: JSON.stringify(attacks),
    })
  }, [persist, attacks])

  const emptyAttack = {
    name: "",
    bonus: "",
    damage: "",
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
    <ToggleBox title="Weapons and Spells">
      {
        (visible) =>
          visible ? (
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
                      <input
                        value={a.name}
                        onChange={setAttack(index, "name")}
                      />
                    </div>
                    <div className="sheet__attacks--row-cell">
                      <input
                        value={a.bonus}
                        onChange={setAttack(index, "bonus")}
                      />
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
          ) : null /* todo: replace null with the "abbreviated" display of this sub sheet */
      }
    </ToggleBox>
  )
}

function MiscData({ char, persist }) {
  const [equipment, setEquipment] = useState(char.equipment.join("\n"))
  const [proficiencies, setProficiencies] = useState(
    char.proficiencies.join("\n")
  )
  const [traits, setTraits] = useState(char.traits.join("\n"))
  const [languages, setLanguages] = useState(char.languages.join("\n"))
  const [notes, setNotes] = useState(char.notes)
  // const [locked, setLocked] = useState(false)

  useEffect(() => {
    persist({
      equipment: JSON.stringify(equipment.split("\n")),
      proficiencies: JSON.stringify(proficiencies.split("\n")),
      traits: JSON.stringify(traits.split("\n")),
      languages: JSON.stringify(languages.split("\n")),
      notes: notes,
    })
  }, [persist, equipment, languages, notes, proficiencies, traits])

  return (
    <ToggleBox title="Misc">
      {
        (visible) =>
          visible ? (
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
          ) : null /* todo: replace null with the "abbreviated" display of this sub sheet */
      }
    </ToggleBox>
  )
}

/* this is the reusable ToggleBox component */
function ToggleBox({ title, init = true, children }) {
  const [open, setOpen] =
    useState(init) /* state management is localized to the reusable component */
  return (
    <div className="sheet__details">
      <h1 className="sheet__titles">Character</h1>
      <div className="toggle" onClick={() => setOpen(!open)}>
        { open
        ? <EyeOpen />
        : <EyeClose />
        }
      </div>
      {children(open)}{" "}
      {/* calling children as a function is a "render prop", see react docs */}
    </div>
  )
}