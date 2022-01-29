import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import hex from '../../assets/images/hexagon.svg'
import './CreateCharacter.scss'
import upload from '../../assets/icons/upload.svg'
import { addCharacter } from '../../Api'
const API_URL = `https://www.dnd5eapi.co`

function reshapeAbilityBonus(t) {
    return { [t.ability_score.index]: t.bonus }
}

function reshapeAbilityBonuses(a) {
    return Object.assign(...a.map(reshapeAbilityBonus)) // without using reduce
}

function computeModifier(ability=0, bonus=0) {
    const total = ability + bonus
    if(total < 10)
    return Math.floor((10-total)/-2)
    else 
    return Math.floor((total-10)/2)
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
    const [abilities, setAbilities] = useState({ str:10, dex:10, con:10, wis:10, int:10, cha:10 })
    const [bonuses, setBonuses] = useState({})
    const [hitdie, setHitdie] = useState(0)
    const [hp, setHp] = useState(0)
    const [speed, setSpeed] = useState(0)

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        addCharacter({
            charName, 
            avatar,
            race:raceSelection, 
            subrace:subraceSelection, 
            char_class:classSelection,
            abilities, 
            archetype, 
            background, 
            hp, 
            speed
        })
        .then((response) => {
        navigate('/')
        })
        .catch((err) => {
        alert("Error creating character")
        })
      }

    const setAbility = ability => (e) => {
        const n = Number.parseInt(e.target.value)
        if (Number.isNaN(n) || n < 0)
            setAbilities({...abilities, [ability]:0})
        else if (n > 99)
            setAbilities({...abilities, [ability]:99})
        else
            setAbilities({...abilities, [ability]:n})
    }

    const handleAvg = (e) => {
        e.preventDefault()
        setHp(Math.max(1, Math.floor(hitdie/2) + computeModifier(abilities.con, bonuses.con)))
    }
    
    const handleMax = (e) => {
        e.preventDefault()
        setHp(Math.max(1, Math.floor(hitdie) + computeModifier(abilities.con, bonuses.con)))
    }
    
    const handleRoll = (e) => {
        e.preventDefault()
        setHp(Math.max(1, Math.floor(Math.random() * hitdie) + 1 + computeModifier(abilities.con, bonuses.con)))
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
            setSubraceSelection('')
            setSubRaces(response.data.subraces)
            setBonuses(reshapeAbilityBonuses(response.data.ability_bonuses))
            setSpeed(response.data.speed)
        })
    },[raceSelection])
        
    useEffect(() => {
        if(subraceSelection === "") return
        axios.get(`${API_URL}/api/subraces/${subraceSelection}`)
        .then((response) => {
            setBonuses(m => {
                return {...m, ...reshapeAbilityBonuses(response.data.ability_bonuses)}
            })
        })
    },[subraceSelection])

    useEffect(() => {
        if(classSelection === "") return
        axios.get(`${API_URL}/api/classes/${classSelection}`)
        .then((response) => {
            setArchetypes(response.data.subclasses)
            setHitdie(response.data.hit_die)
        })
    },[classSelection])

    useEffect(fetchData,[])
 
  return (
  <div className='create'>
    <form className='create__form' onSubmit={handleSubmit}>
        <div className='create__form--top'>
            <Upload avatar={avatar} setAvatar={setAvatar}/>
            <div className='create__form--top-name'>
            <label htmlFor="char_name" className='create__form--titles'>Name</label>
            <input type="text" id='char_name' className='create__form--select' value={charName} onChange={e => setCharName(e.target.value)}/> 
            </div>
        </div>

        <label htmlFor="race" className="create__form--titles">Race</label>
        <select name="race" id="race" className="create__form--select" value={raceSelection} onChange={e => setRaceSelection(e.target.value)}>
            <option value="" className="create__form--select-item" >--Please select a race--</option>
            {races.map((race) => {
                return(
                    <option key={race.index} value={race.index} className="create__form--select-item">{race.name}</option>
                )
            })}
        </select>

        <label htmlFor="subRace" className="create__form--titles">Sub Race</label>
        <select name="subRace" id="subRace" className="create__form--select" value={subraceSelection} disabled={raceSelection === ''} onChange={e => setSubraceSelection(e.target.value)}>
            <option value="">--Please select a subrace--</option>
                {subRaces.map((subrace) => {
                    return(
                        <option key={subrace.index} value={subrace.index}>{subrace.name}</option>
                    )
                })}
        </select>   

        <label htmlFor="char_class" className="create__form--titles">Class</label>
        <select name="char_class" id="char_class" className="create__form--select" value={classSelection} onChange={e => setClassSelection(e.target.value)}>
            <option value="" className="create__form--select-item">--Please select a class--</option>
            {charClasses.map((c) => {
                return(
                    <option key={c.index} value={c.index} className="create__form--select-item">{c.name}</option>
                )
            })}
        </select>   

        <label htmlFor="archetype" className="create__form--titles">Archetype</label>
        <select name="archetype" id="archetype" className="create__form--select" value={archetype} disabled={classSelection === ""} onChange={e => setArchetype(e.target.value)}>
        <option value="" className="create__form--select-item">--Please select an archetype--</option>
        {archetypes.map((s) => {
                return(
                    <option key={s.index} value={s.index} className="create__form--select-item">{s.name}</option>
                )
            })}
        </select>

        <label htmlFor="background" className="create__form--titles">Background</label>
        <select name="background" id="background" className="create__form--select" value={background} onChange={e => setBackground(e.target.value)}>
            <option value="" className="create__form--select-item">--Please select a background--</option>
            {backgrounds.map((b) => {
                return(
                    <option key={b.index} value={b.index} className="create__form--select-item">{b.name}</option>
                )
            })}
        </select>    

        <label className='create__form--titles'>Ability Scores</label>

        <div className='create__abilities'>

            <div className='create__abilities--hexes'>
            <div className='create__hex--item'>
                <Hexagon abilityBonus={bonuses.str} abilities={abilities.str} bonuses={bonuses.str}/>
                <input className='create__abilities--scores' type='text' value={abilities.str} onChange={setAbility("str")}/>
                <div className='create__abilities--scores-names'>STR</div>
            </div>
            <div className='create__hex--item'>
                <Hexagon abilityBonus={bonuses.dex} abilities={abilities.dex} bonuses={bonuses.dex}/>
                <input className='create__abilities--scores' type='text' value={abilities.dex} onChange={setAbility("dex")}/>            
                <div className='create__abilities--scores-names'>DEX</div>
            </div>

            <div className='create__hex--item'>
                <Hexagon abilityBonus={bonuses.con} abilities={abilities.con} bonuses={bonuses.con}/>
                <input className='create__abilities--scores' type='text' value={abilities.con} onChange={setAbility("con")}/>            
                <div className='create__abilities--scores-names'>CON</div>
            </div>
            </div>

            <div className='create__abilities--hexes'>

            <div className='create__hex--item'>
                <Hexagon abilityBonus={bonuses.wis} abilities={abilities.wis} bonuses={bonuses.wis}/>
                <input className='create__abilities--scores' type='text' value={abilities.wis} onChange={setAbility("wis")}/>            
                <div className='create__abilities--scores-names'>WIS</div>    
            </div>

            <div className='create__hex--item'>
                <Hexagon abilityBonus={bonuses.int} abilities={abilities.int} bonuses={bonuses.int}/>
                <input className='create__abilities--scores' type='text' value={abilities.int} onChange={setAbility("int")}/>            
                <div className='create__abilities--scores-names'>INT</div>
            </div>

            <div className='create__hex--item'>
            <Hexagon abilityBonus={bonuses.cha} abilities={abilities.cha} bonuses={bonuses.cha}/>
            <input className='create__abilities--scores' type='text' value={abilities.cha} onChange={setAbility("cha")}/>
            <div className='create__abilities--scores-names'>CHA</div>
            </div>

            </div>
        </div>

        <label className='create__form--titles' htmlFor="hp">HP<span className=''>- hit die = {hitdie}</span> </label>
        <div className="create__form--hp">
            <input className='create__form--hp-num' name='hp' id='hp' value={hp} placeholder='HP' onChange={e => setHp(e.target.value)}></input>
            <button className='create__form--hp-button' onClick={handleAvg}>avg</button>
            <button className='create__form--hp-button' onClick={handleMax}>max</button>
            <button className='create__form--hp-button' onClick={handleRoll}>roll</button>
        </div>

        <div className='create__form--buttons'>
            <Link className='create__form--cancel' to='/characters'>Cancel</Link>
            <button className='create__form--submit' type='submit'>Submit</button>    
        </div> 

      </form>
  </div>
  )}

export default CreateCharacter


function Hexagon({abilityBonus=0, abilities, bonuses}) {
  return <div className='create__hex'>
            <img src={hex} alt="hexagon" />
            <span className='create__hex--modifier'>{computeModifier(abilities, bonuses)}</span>
            {abilityBonus === 0 
            ? null 
            : <div className='create__hex--bonus'>+{abilityBonus}</div>
            }
      </div>
}

function Upload({avatar, setAvatar}) {

    const fileInputRef = useRef()

    const handleChange = (e) => {
        const file = e.target.files[0]
        if (file && file.type.substring(0, 5) !== "image") 
        return alert('You must select an image type.  Bud.')
        const reader = new FileReader()
        reader.onloadend = () => setAvatar(reader.result)
        reader.readAsDataURL(file)
    }
    const handleClick = (e) => {
        e.preventDefault() 
        fileInputRef.current.click()
    }

    return <div className="upload">
        <button className='upload__button' onClick={handleClick}>
            { avatar
            ?   <img src={avatar} alt="avatar" className='upload__preview'/>
            :   <>
                  Add Avatar
                  <img src={upload} alt="upload icon" />
                </>
            }
        </button>
        <input type="file" className='upload__input' ref={fileInputRef} accept="image/*" onChange={handleChange}/>
    </div> 
}