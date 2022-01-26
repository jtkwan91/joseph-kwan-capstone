import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import hex from '../../assets/images/hexagon.svg'
import './CreateCharacter.scss'
const API_URL = `https://www.dnd5eapi.co`

function CreateCharacter() {

    const [races, setRaces] = useState([])
    const [raceSelection, setRaceSelection] = useState("")
    const [subRaces, setSubRaces] = useState([])
    const [charClasses, setCharClasses] = useState([])
    const [classSelection, setClassSelection] = useState("")
    const [subclasses, setSubClasses] = useState([])
    const [backgrounds, setBackgrounds] =useState([])
    const [abilities, setAbilities] = useState({ str:0, dex:0, con:0, wis:0, int:0, cha:0 })

    const setAbility = ability => (e) => {
        const n = Number.parseInt(e.target.value)
        if (Number.isNaN(n) || n < 0)
            setAbilities({...abilities, [ability]:0})
        else if (n > 99)
            setAbilities({...abilities, [ability]:99})
        else
            setAbilities({...abilities, [ability]:n})
    }

    const fetchData = () => {
        axios.get(`${API_URL}/api/races`)
        .then((response) => {
            setRaces(response.data.results)
        })
        axios.get(`${API_URL}/api/classes`)
        .then((response) => {
            setCharClasses(response.data.results)
        })
        axios.get(`http://localhost:8080/backgrounds`)
        .then((response) => {
            setBackgrounds(response.data)
        })
      }

    useEffect(() => {
        if(raceSelection === "") return
        axios.get(`${API_URL}/api/races/${raceSelection}`)
        .then((response) => {
            setSubRaces(response.data.subraces)
        })
    },[raceSelection])

    useEffect(() => {
        if(classSelection === "") return
        axios.get(`${API_URL}/api/classes/${classSelection}`)
        .then((response) => {
            setSubClasses(response.data.subclasses)
        })
    },[classSelection])

    useEffect(fetchData,[])

  return (
  <div className='create'>
    <div className='create__form'>

        <label htmlFor="Race" className="create__form--titles">Race</label>
        <select name="Race" id="Race" className="create__form--select" value={raceSelection} onChange={e => setRaceSelection(e.target.value)}>
            <option value="" className="create__form--select-item" >--Please select a race--</option>
            {races.map((race) => {
                return(
                    <option key={race.index} value={race.index} className="create__form--select-item">{race.name}</option>
                )
            })}
        </select>

        <label htmlFor="SubRace" className="create__form--titles">Sub Race</label>
        <select name="SubRace" id="SubRace" className="create__form--select" disabled={raceSelection === ""}>
                {subRaces.map((subrace) => {
                    return(
                        <option key={subrace.index} value={subrace.index}>{subrace.name}</option>
                    )
                })}
        </select>   

        <label htmlFor="Class" className="create__form--titles">Class</label>
        <select name="Class" id="Class" className="create__form--select" value={classSelection} onChange={e => setClassSelection(e.target.value)}>
            <option value="" className="create__form--select-item">--Please select a class--</option>
            {charClasses.map((c) => {
                return(
                    <option key={c.index} value={c.index} className="create__form--select-item">{c.name}</option>
                )
            })}
        </select>   

        <label htmlFor="Archetype" className="create__form--titles">Archetype</label>
        <select name="Archetype" id="Archetype" className="create__form--select" disabled={classSelection === ""}>
        {
        subclasses.map((s) => {
                return(
                    <option key={s.index} value={s.index} className="create__form--select-item">{s.name}</option>
                )
            })}
        </select>

        <label htmlFor="Background" className="create__form--titles">Background</label>
        <select name="Background" id="Background" className="create__form--select">
            <option value="" className="create__form--select-item">--Please select a background--</option>
            {backgrounds.map((b) => {
                return(
                    <option key={b.index} value={b.index} className="create__form--select-item">{b.name}</option>
                )
            })}
        </select>    

        <label className='create__abilities--title'>Ability Scores</label>

        <div className='create__abilities'>
            <div className='create__abilities--hexes'>
            <img className='create__hex' src={hex} alt="hexagon" />
            <img className='create__hex' src={hex} alt="hexagon" />
            <img className='create__hex' src={hex} alt="hexagon" />
            <img className='create__hex' src={hex} alt="hexagon" />
            <img className='create__hex' src={hex} alt="hexagon" />
            <img className='create__hex' src={hex} alt="hexagon" />
            </div>
            <input className='create__abilities--scores' type='text' value={abilities.str} onChange={setAbility("str")}/>
            <input className='create__abilities--scores' type='text' value={abilities.dex} onChange={setAbility("dex")}/>            
            <input className='create__abilities--scores' type='text' value={abilities.con} onChange={setAbility("con")}/>            
            <input className='create__abilities--scores' type='text' value={abilities.wis} onChange={setAbility("wis")}/>            
            <input className='create__abilities--scores' type='text' value={abilities.int} onChange={setAbility("int")}/>            
            <input className='create__abilities--scores' type='text' value={abilities.cha} onChange={setAbility("cha")}/>
        </div>

        <div className='create__abilities--scores-text'>
            <div className='create__abilities--scores-names'>STR</div>
            <div className='create__abilities--scores-names'>DEX</div>
            <div className='create__abilities--scores-names'>CON</div>
            <div className='create__abilities--scores-names'>WIS</div>
            <div className='create__abilities--scores-names'>INT</div>
            <div className='create__abilities--scores-names'>CHA</div>
        </div>

        <div className="create__form--hp">
            <div className='create__form--hp-num'></div>
            <button className='create__form--hp-button'>avg</button>
            <button className='create__form--hp-button'>max</button>
            <button className='create__form--hp-button'>roll</button>
        </div>

        <div className='create__form--buttons'>
            <Link className='create__form--cancel' to='/characters'>Cancel</Link>
            <button className='create__form--submit' type='submit'>Submit</button>    
        </div> 

      </div>
  </div>
  )}

export default CreateCharacter
