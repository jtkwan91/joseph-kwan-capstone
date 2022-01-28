import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import hex from '../../assets/images/hexagon.svg'
import './CreateCharacter.scss'
import upload from '../../assets/icons/upload.svg'
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

    const [races, setRaces] = useState([])
    const [raceSelection, setRaceSelection] = useState("")
    const [subraceSelection, setSubraceSelection] = useState("")
    const [subRaces, setSubRaces] = useState([])
    const [charClasses, setCharClasses] = useState([])
    const [classSelection, setClassSelection] = useState("")
    const [subclasses, setSubClasses] = useState([])
    const [backgrounds, setBackgrounds] =useState([])
    const [abilities, setAbilities] = useState({ str:10, dex:10, con:10, wis:10, int:10, cha:10 })
    const [bonuses, setBonuses] = useState({})
    const [hitdie, setHitdie] = useState(0)
    const [hp, setHp] = useState(0)

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
            setSubClasses(response.data.subclasses)
            setHitdie(response.data.hit_die)
        })
    },[classSelection])

    useEffect(fetchData,[])
 
  return (
  <div className='create'>
    <form className='create__form'>
        <div className='create__form--top'>
            <Upload />
            <div className='create__form--top-name'>
            <label htmlFor="Name" className='create__form--titles'>Name</label>
            <input type="text" id='Name' className='create__form--select'/> 
            </div>
        </div>

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
        <select name="SubRace" id="SubRace" className="create__form--select" value={subraceSelection} disabled={raceSelection === ''} onChange={e => setSubraceSelection(e.target.value)}>
            <option value="">--Please select a subrace--</option>
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
            <Hexagon abilityBonus={bonuses.str}/>
            <Hexagon abilityBonus={bonuses.dex}/>
            <Hexagon abilityBonus={bonuses.con}/>
            <Hexagon abilityBonus={bonuses.wis}/>
            <Hexagon abilityBonus={bonuses.int}/>
            <Hexagon abilityBonus={bonuses.cha}/>
            </div>
            <input className='create__abilities--scores' type='text' value={abilities.str} onChange={setAbility("str")}/>
            <input className='create__abilities--scores' type='text' value={abilities.dex} onChange={setAbility("dex")}/>            
            <input className='create__abilities--scores' type='text' value={abilities.con} onChange={setAbility("con")}/>            
            <input className='create__abilities--scores' type='text' value={abilities.wis} onChange={setAbility("wis")}/>            
            <input className='create__abilities--scores' type='text' value={abilities.int} onChange={setAbility("int")}/>            
            <input className='create__abilities--scores' type='text' value={abilities.cha} onChange={setAbility("cha")}/>
        </div>

        <div className='create__abilities--scores-text'>
            <div className='create__abilities--scores-names'>STR <span>{computeModifier(abilities.str, bonuses.str)}</span></div>
            <div className='create__abilities--scores-names'>DEX <span>{computeModifier(abilities.dex, bonuses.dex)}</span></div>
            <div className='create__abilities--scores-names'>CON <span>{computeModifier(abilities.con, bonuses.con)}</span></div>
            <div className='create__abilities--scores-names'>WIS <span>{computeModifier(abilities.wis, bonuses.wis)}</span></div>
            <div className='create__abilities--scores-names'>INT <span>{computeModifier(abilities.int, bonuses.int)}</span></div>
            <div className='create__abilities--scores-names'>CHA <span>{computeModifier(abilities.cha, bonuses.cha)}</span></div>
        </div>

        <label className='create__abilities--title' htmlFor="hp">HP <span className=''>- hit die = {hitdie}</span> </label>
        <div className="create__form--hp">
            <input className='create__form--hp-num' id='hp' value={hp} placeholder='HP' onChange={e => setHp(e.target.value)}></input>
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


function Hexagon({abilityBonus=0}) {
  return <div className='create__hex'>
            <img src={hex} alt="hexagon" />
            {abilityBonus === 0 
            ? null 
            : <div className='create__hex--modifier'>+{abilityBonus}</div>
            }
      </div>
}

function Upload() {
    const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const fileInputRef = useRef();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  return (
    <div className="upload">
        {preview ? (
          <img className='upload__preview' src={preview} alt='preview' onClick={() => {
              setImage(null)
            }}
        />
        ) : (
          <button className='upload__button' onClick={(event) => { 
              event.preventDefault(); fileInputRef.current.click()
            }}
          >
            Add Avatar
            <img src={upload} alt="upload icon" />
          </button>
        )}
        <input type="file" className='upload__input' ref={fileInputRef} accept="image/*" onChange={(event) => {
            const file = event.target.files[0];
            if (file && file.type.substring(0, 5) === "image") {
              setImage(file);
            } else {
              setImage(null);
            }
          }}
        />
    </div>
  )
}
