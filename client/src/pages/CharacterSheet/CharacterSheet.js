import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import eyeOpen from "../../assets/icons/open-eye.svg"
import eyeClose from "../../assets/icons/closed-eye.svg"
import { getCharacter } from "../../Api"
import "./CharacterSheet.scss"
import { Hexagon } from "../../Character"

//to do onChange function for experience, level, hps, death saves

function CharacterSheet() {
  const [charDetails, setCharDetails] = useState(null)

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
        {charDetails ? (
          <>
            <pre>{JSON.stringify(charDetails, null, 2)}</pre>
            <CharDetails charDetails={charDetails} />
            <Core charDetails={charDetails} />
            <Abilities charDetails={charDetails} />
            <WeaponsSpells charDetails={charDetails} />
            <MiscData charDetails={charDetails} />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}

export default CharacterSheet

function CharDetails({ charDetails }) {
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
            <img
              className="sheet__details--avatar"
              src={`http://localhost:8080/characters/${charDetails.id}/avatar`}
              alt="avatar"
            />
          </div>
          <div className="sheet__details--info">
            <div className="sheet__details--element">
              <label
                className="sheet__details--element-title"
                htmlFor="char-name"
              >
                Name:{" "}
              </label>
              <input
                className="sheet__details--element-input"
                defaultValue={charDetails.name}
              />
            </div>

            <div className="sheet__details--element">
              <label
                className="sheet__details--element-title"
                htmlFor="char-race"
              >
                Race:{" "}
              </label>
              <input
                className="sheet__details--element-input"
                defaultValue={charDetails.race.name}
              />
            </div>

            <div className="sheet__details--element">
              <label
                className="sheet__details--element-title"
                htmlFor="char-subrace"
              >
                Subrace:{" "}
              </label>
              <input
                className="sheet__details--element-input"
                defaultValue={charDetails.subrace?.name ?? ""}
              />
            </div>

            <div className="sheet__details--element">
              <label
                className="sheet__details--element-title"
                htmlFor="char-class"
              >
                Class:{" "}
              </label>
              <input
                className="sheet__details--element-input"
                defaultValue={charDetails.class.name}
              />
            </div>

            <div className="sheet__details--element">
              <label
                className="sheet__details--element-title"
                htmlFor="char-archetype"
              >
                Archetype:{" "}
              </label>
              <input
                className="sheet__details--element-input"
                defaultValue={charDetails.archetype?.name ?? ""}
              />
            </div>

            <div className="sheet__details--element">
              <label
                className="sheet__details--element-title"
                htmlFor="char-background"
              >
                Background:{" "}
              </label>
              <input
                className="sheet__details--element-input"
                defaultValue={charDetails.background?.name ?? ""}
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
                defaultValue={charDetails.exp}
              />
            </div>
            <div className="sheet__details--element">
              <label className="sheet__details--element-title" htmlFor="level">
                Level:
              </label>
              <input
                className="sheet__details--element-input"
                defaultValue={charDetails.level}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function Core({ charDetails }) {
  const [toggle, setToggle] = useState(true)
  const [eyecon, setEyecon] = useState(true)

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
              Initiative:{" "}
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
            <input
              className="stat-block__input"
              id="inspiration"
              type="checkbox"
            />
          </div>
          <div className="stat-block">
            <label className="stat-block__label" htmlFor="speed">
              Speed:{" "}
            </label>
            <input
              className="stat-block__input"
              id="speed"
              defaultValue={charDetails.speed}
            />
          </div>
          <div className="stat-block">
            <label className="stat-block__label" htmlFor="proficiency">
              Proficency
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
              defaultValue={charDetails.current_hp}
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
              defaultValue={charDetails.max_hp}
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
              defaultValue={charDetails.temp_hp}
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
              defaultValue={charDetails.class.hit_die}
            />
          </div>
          <div className="stat-block">
            <h3 className="stat-block__label">Death Saves</h3>
            <div className="death-saves">
              <label htmlFor="death_fail" className="death-saves__title">
                Fail
              </label>
              <input
                className="stat-block__input death-saves__input"
                type="checkbox"
                id="death_fail"
              />

              <input
                className="stat-block__input death-saves__input"
                type="checkbox"
                id="death_fail"
              />

              <input
                className="stat-block__input death-saves__input"
                type="checkbox"
                id="death_fail"
              />
            </div>
            <div className="death-saves">
              <label htmlFor="death_passes" className="death-saves__title">
                Pass
              </label>
              <input
                className="stat-block__input death-saves__input"
                type="checkbox"
                id="death_pass"
              />

              <input
                className="stat-block__input death-saves__input"
                type="checkbox"
                id="death_pass"
              />

              <input
                className="stat-block__input death-saves__input"
                type="checkbox"
                id="death_pass"
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function Abilities({ charDetails }) {
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
                ability={charDetails.abi_str}
                onChange={() => console.log("todo update: str")}
              />
              <Hexagon
                label="DEX"
                ability={charDetails.abi_dex}
                onChange={() => console.log("todo update: dex")}
              />
              <Hexagon
                label="CON"
                ability={charDetails.abi_con}
                onChange={() => console.log("todo update: con")}
              />
            </div>

            <div className="create__abilities--hexes">
              <Hexagon
                label="INT"
                ability={charDetails.abi_int}
                onChange={() => console.log("todo update: int")}
              />
              <Hexagon
                label="WIS"
                ability={charDetails.abi_wis}
                onChange={() => console.log("todo update: wis")}
              />
              <Hexagon
                label="CHA"
                ability={charDetails.abi_cha}
                onChange={() => console.log("todo update: cha")}
              />
            </div>
          </div>

          {/* <div className="stat-block">
            <label className="stat-block__label" htmlFor="abi">
              STR
            </label>
            <input
              className="stat-block__input"
              defaultValue={charDetails.abi_str}
            />
          </div>
          <div className="stat-block">
            <label className="stat-block__label" htmlFor="abi">
              DEX
            </label>
            <input
              className="stat-block__input"
              defaultValue={charDetails.abi_dex}
            />
          </div>
          <div className="stat-block">
            <label className="stat-block__label" htmlFor="abi">
              CON
            </label>
            <input
              className="stat-block__input"
              defaultValue={charDetails.abi_con}
            />
          </div>
          <div className="stat-block">
            <label className="stat-block__label" htmlFor="abi">
              INT
            </label>
            <input
              className="stat-block__input"
              defaultValue={charDetails.abi_int}
            />
          </div>
          <div className="stat-block">
            <label className="stat-block__label" htmlFor="abi">
              WIS
            </label>
            <input
              className="stat-block__input"
              defaultValue={charDetails.abi_wis}
            />
          </div>
          <div className="stat-block">
            <label className="stat-block__label" htmlFor="abi">
              CHA
            </label>
            <input
              className="stat-block__input"
              defaultValue={charDetails.abi_cha}
            />
          </div> */}
        </div>
      ) : null}
    </div>
  )
}

function WeaponsSpells({ charDetails }) {
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

function MiscData({ charDetails }) {
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
                id="misc-equipment"
                cols="30"
                rows="10"
              >
                {charDetails.equipment.join("\n")}
              </textarea>
              <label className="sheet__misc--label">Proficiencies</label>
              <textarea
                name="proficiencies"
                id="misc-proficiencies"
                cols="30"
                rows="10"
              >
                {charDetails.proficiencies.join("\n")}
              </textarea>
              <label className="sheet__misc--label">Languages</label>
              <textarea
                name="languages"
                id="misc-languages"
                cols="30"
                rows="10"
              >
                {charDetails.languages.join("\n")}
              </textarea>

              <label className="sheet__misc--label">Traits</label>
              <textarea name="languages" id="misclanguages" cols="30" rows="10">
                {charDetails.traits.join("\n")}
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
                {/* {charDetails.notes} */}
              </textarea>
            </div>{" "}
          </div>
        </div>
      ) : null}
    </div>
  )
}
