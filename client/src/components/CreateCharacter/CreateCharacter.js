import React, { useRef, useState, useEffect } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import "./CreateCharacter.scss"
import upload from "../../assets/icons/upload.svg"
import { addCharacter, getBackground, getBackgrounds } from "../../Api"
import { Hexagon, computeHp, randomInt } from "../../Character"
const API_URL = `https://www.dnd5eapi.co`

function reshapeAbilityBonus(t) {
  return { [t.ability_score.index]: t.bonus }
}

function reshapeAbilityBonuses(a) {
  return Object.assign(...a.map(reshapeAbilityBonus)) // without using reduce
}

function CreateCharacter() {
  const [avatar, setAvatar] = useState(null)
  const [charName, setCharName] = useState("")
  const [races, setRaces] = useState([])
  const [raceSelection, setRaceSelection] = useState("")
  const [subraceSelection, setSubraceSelection] = useState("")
  const [subRaces, setSubRaces] = useState([])
  const [charClasses, setCharClasses] = useState([])
  const [classSelection, setClassSelection] = useState("")
  const [archetypes, setArchetypes] = useState([])
  const [archetype, setArchetype] = useState("")
  const [backgrounds, setBackgrounds] = useState([])
  const [background, setBackground] = useState("")
  const [abilities, setAbilities] = useState({
    str: 10,
    dex: 10,
    con: 10,
    wis: 10,
    int: 10,
    cha: 10,
  })
  const [bonuses, setBonuses] = useState({})
  const [hitdie, setHitdie] = useState(0)
  const [hp, setHp] = useState(0)
  const [speed, setSpeed] = useState(0)
  const [classEquipment, setClassEquipment] = useState(null)
  const [backgroundEquipment, setBackgroundEquipment] = useState(null)
  const [traits, setTraits] = useState(null)
  const [raceProficiencies, setRaceProficiencies] = useState(null)
  const [classProficiencies, setClassProficiencies] = useState(null)
  const [languages, setLanguages] = useState(null)

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addCharacter({
      charName,
      avatar,
      race: raceSelection,
      subrace: subraceSelection,
      char_class: classSelection,
      abilities: {
        str: abilities.str + (bonuses.str ?? 0),
        dex: abilities.dex + (bonuses.dex ?? 0),
        con: abilities.con + (bonuses.con ?? 0),
        wis: abilities.wis + (bonuses.wis ?? 0),
        int: abilities.int + (bonuses.int ?? 0),
        cha: abilities.cha + (bonuses.cha ?? 0),
      },
      archetype,
      background,
      hp,
      speed,
      level: 1,
      exp: 0,
      equipment: [...classEquipment, ...backgroundEquipment],
      traits,
      proficiencies: [...raceProficiencies, ...classProficiencies],
      languages,
      hitdie: `1d${hitdie}`
    })
      .then((response) => {
        navigate("/")
      })
      .catch((err) => {
        alert("Error creating character")
      })
  }

  const handleAvg = (event) =>
    setHp(computeHp(Math.floor(hitdie / 2), abilities.con, bonuses.con))
  const handleMax = (event) =>
    setHp(computeHp(hitdie, abilities.con, bonuses.con))
  const handleRoll = (event) =>
    setHp(randomInt(hitdie), abilities.con, bonuses.con)

  const setAbility = (ability) => (e) => {
    const n = Number.parseInt(e.target.value)
    if (Number.isNaN(n) || n < 0) setAbilities({ ...abilities, [ability]: 0 })
    else if (n > 99) setAbilities({ ...abilities, [ability]: 99 })
    else setAbilities({ ...abilities, [ability]: n })
  }

  const fetchData = () => {
    axios.get(`${API_URL}/api/races`).then((response) => {
      setRaces(response.data.results)
    })
    axios.get(`${API_URL}/api/classes`).then((response) => {
      setCharClasses(response.data.results)
    })
    getBackgrounds().then(setBackgrounds)
  }

  useEffect(() => {
    if (raceSelection === "") return
    axios.get(`${API_URL}/api/races/${raceSelection}`).then((response) => {
      setSubraceSelection("")
      setSubRaces(response.data.subraces)
      setBonuses(reshapeAbilityBonuses(response.data.ability_bonuses))
      setSpeed(response.data.speed)
      setTraits(response.data.traits)
      setLanguages(response.data.languages)
      setRaceProficiencies(response.data.starting_proficiencies)
    })
  }, [raceSelection])

  useEffect(() => {
    if (subraceSelection === "") return
    axios
      .get(`${API_URL}/api/subraces/${subraceSelection}`)
      .then((response) => {
        setBonuses((m) => {
          return {
            ...m,
            ...reshapeAbilityBonuses(response.data.ability_bonuses),
          }
        })
      })
  }, [subraceSelection])

  useEffect(() => {
    if (classSelection === "") return
    axios.get(`${API_URL}/api/classes/${classSelection}`).then((response) => {
      setArchetypes(response.data.subclasses)
      setHitdie(response.data.hit_die)
      setClassEquipment(response.data.starting_equipment)
      setClassProficiencies(response.data.proficiencies)
    })
  }, [classSelection])

  useEffect(() => {
    if (background === "") return
    getBackground(background).then(response => {
      setBackgroundEquipment(response.starting_equipment)
    })
  }, [background])

  useEffect(fetchData, [])

  return (
    <div className="create">
      <form className="create__form" onSubmit={handleSubmit}>
        <div className="create__form--top">
          <Upload avatar={avatar} setAvatar={setAvatar} />
          <div className="create__form--top-name">
            <label htmlFor="char_name" className="create__form--titles">
              Name
            </label>
            <input
              type="text"
              id="char_name"
              className="create__form--select"
              value={charName}
              onChange={(e) => setCharName(e.target.value)}
            />
          </div>
        </div>

        <label htmlFor="race" className="create__form--titles">
          Race
        </label>
        <select
          name="race"
          id="race"
          className="create__form--select"
          value={raceSelection}
          onChange={(e) => setRaceSelection(e.target.value)}
        >
          <option value="" className="create__form--select-item">
            --Please select a race--
          </option>
          {races.map((race) => {
            return (
              <option
                key={race.index}
                value={race.index}
                className="create__form--select-item"
              >
                {race.name}
              </option>
            )
          })}
        </select>

        <label htmlFor="subRace" className="create__form--titles">
          Sub Race
        </label>
        <select
          name="subRace"
          id="subRace"
          className="create__form--select"
          value={subraceSelection}
          disabled={raceSelection === ""}
          onChange={(e) => setSubraceSelection(e.target.value)}
        >
          <option value="">--Please select a subrace--</option>
          {subRaces.map((subrace) => {
            return (
              <option key={subrace.index} value={subrace.index}>
                {subrace.name}
              </option>
            )
          })}
        </select>

        <label htmlFor="char_class" className="create__form--titles">
          Class
        </label>
        <select
          name="char_class"
          id="char_class"
          className="create__form--select"
          value={classSelection}
          onChange={(e) => setClassSelection(e.target.value)}
        >
          <option value="" className="create__form--select-item">
            --Please select a class--
          </option>
          {charClasses.map((c) => {
            return (
              <option
                key={c.index}
                value={c.index}
                className="create__form--select-item"
              >
                {c.name}
              </option>
            )
          })}
        </select>

        <label htmlFor="archetype" className="create__form--titles">
          Archetype
        </label>
        <select
          name="archetype"
          id="archetype"
          className="create__form--select"
          value={archetype}
          disabled={classSelection === ""}
          onChange={(e) => setArchetype(e.target.value)}
        >
          <option value="" className="create__form--select-item">
            --Please select an archetype--
          </option>
          {archetypes.map((s) => {
            return (
              <option
                key={s.index}
                value={s.index}
                className="create__form--select-item"
              >
                {s.name}
              </option>
            )
          })}
        </select>

        <label htmlFor="background" className="create__form--titles">
          Background
        </label>
        <select
          name="background"
          id="background"
          className="create__form--select"
          value={background}
          onChange={(e) => setBackground(e.target.value)}
        >
          <option value="" className="create__form--select-item">
            --Please select a background--
          </option>
          {backgrounds.map((b) => {
            return (
              <option
                key={b.index}
                value={b.index}
                className="create__form--select-item"
              >
                {b.name}
              </option>
            )
          })}
        </select>

        <label className="create__form--titles">Ability Scores</label>

        <div className="create__abilities">
          <div className="create__abilities--hexes">
            <Hexagon
              label="STR"
              ability={abilities.str}
              bonus={bonuses.str}
              onChange={setAbility("str")}
            />
            <Hexagon
              label="DEX"
              ability={abilities.dex}
              bonus={bonuses.dex}
              onChange={setAbility("dex")}
            />
            <Hexagon
              label="CON"
              ability={abilities.con}
              bonus={bonuses.con}
              onChange={setAbility("con")}
            />
          </div>

          <div className="create__abilities--hexes">
            <Hexagon
              label="INT"
              ability={abilities.int}
              bonus={bonuses.int}
              onChange={setAbility("int")}
            />
            <Hexagon
              label="WIS"
              ability={abilities.wis}
              bonus={bonuses.wis}
              onChange={setAbility("wis")}
            />
            <Hexagon
              label="CHA"
              ability={abilities.cha}
              bonus={bonuses.cha}
              onChange={setAbility("cha")}
            />
          </div>
        </div>

        <label className="create__form--titles" htmlFor="hp">
          HP<span className="">- hit die = {hitdie}</span>
        </label>
        <div className="create__form--hp">
          <input
            className="create__form--hp-num"
            name="hp"
            id="hp"
            value={hp}
            placeholder="HP"
            onChange={(e) => setHp(e.target.value)}
          ></input>
          <button
            type="button"
            className="create__form--hp-button"
            onClick={handleAvg}
          >
            avg
          </button>
          <button
            type="button"
            className="create__form--hp-button"
            onClick={handleMax}
          >
            max
          </button>
          <button
            type="button"
            className="create__form--hp-button"
            onClick={handleRoll}
          >
            roll
          </button>
        </div>

        <div className="create__form--buttons">
          <Link className="create__form--cancel" to="/characters">
            Cancel
          </Link>
          <button className="create__form--submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateCharacter

function Upload({ avatar, setAvatar }) {
  const fileInputRef = useRef()

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type.substring(0, 5) !== "image")
      return alert("You must select an image type.  Bud.")
    const reader = new FileReader()
    reader.onloadend = () => setAvatar(reader.result)
    reader.readAsDataURL(file)
  }
  const handleClick = (e) => {
    e.preventDefault()
    fileInputRef.current.click()
  }

  return (
    <div className="upload">
      <button className="upload__button" onClick={handleClick}>
        {avatar ? (
          <img src={avatar} alt="avatar" className="upload__preview" />
        ) : (
          <>
            Add Avatar
            <img src={upload} alt="upload icon" />
          </>
        )}
      </button>
      <input
        type="file"
        className="upload__input"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleChange}
      />
    </div>
  )
}
