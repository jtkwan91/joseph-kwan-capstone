import React from 'react'
import { Link } from 'react-router-dom'
import './CreateCharacter.scss'

function CreateCharacter() {
  return (
  <div className='create'>
    <div className='create__form'>

        <label className='create__abilities--title'>Ability Scores</label>

        <div className='create__abilities'>
            <input className='create__abilities--scores' type='number' /> 
            <input className='create__abilities--scores' type='number' /> 
            <input className='create__abilities--scores' type='number' /> 
            <input className='create__abilities--scores' type='number' /> 
            <input className='create__abilities--scores' type='number' /> 
            <input className='create__abilities--scores' type='number' />
        </div>

        <div className='create__abilities--scores-text'>
            <div className='create__abilities--scores-names'>STR</div>
            <div className='create__abilities--scores-names'>DEX</div>
            <div className='create__abilities--scores-names'>CON</div>
            <div className='create__abilities--scores-names'>WIS</div>
            <div className='create__abilities--scores-names'>INT</div>
            <div className='create__abilities--scores-names'>CHA</div>
        </div>

        <label htmlFor="Race" className="create__form--titles">Race</label>
        <select name="Race" id="Race" className="create__form--select">
            <option value="" className="create__form--select-item">--Please select a race--</option>
            <option value="" className="create__form--select-item">Dwarf</option>
            <option value="" className="create__form--select-item">Elf</option>
            <option value="" className="create__form--select-item">Halfling</option>
            <option value="" className="create__form--select-item">Human</option>
            <option value="" className="create__form--select-item">Dragonborn</option>
            <option value="" className="create__form--select-item">Gnome</option>
            <option value="" className="create__form--select-item">Half-Elf</option>
            <option value="" className="create__form--select-item">Half-Orc</option>
            <option value="" className="create__form--select-item">Tiefling</option>
        </select>

        <label htmlFor="SubRace" className="create__form--titles">Sub Race</label>
        <select name="SubRace" id="SubRace" className="create__form--select">

        </select>   

        <label htmlFor="Class" className="create__form--titles">Class</label>
        <select name="Class" id="Class" className="create__form--select">
            <option value="" className="create__form--select-item">--Please select a class--</option>
            <option value="" className="create__form--select-item">Barbarian</option>
            <option value="" className="create__form--select-item">Bard</option>
            <option value="" className="create__form--select-item">Cleric</option>
            <option value="" className="create__form--select-item">Druid</option>
            <option value="" className="create__form--select-item">Fighter</option>
            <option value="" className="create__form--select-item">Monk</option>            
            <option value="" className="create__form--select-item">Paladin</option>
            <option value="" className="create__form--select-item">Ranger</option>
            <option value="" className="create__form--select-item">Rogue</option>            
            <option value="" className="create__form--select-item">Sorcerer</option>
            <option value="" className="create__form--select-item">Warlock</option>
            <option value="" className="create__form--select-item">Wizard</option>
        </select>   

        <label htmlFor="Archetype" className="create__form--titles">Archetype</label>
        <select name="Archetype" id="Archetype" className="create__form--select">

        </select>

        <label htmlFor="Background" className="create__form--titles">Background</label>
        <select name="Background" id="Background" className="create__form--select">
            <option value="" className="create__form--select-item">--Please select a background--</option>
            <option value="" className="create__form--select-item">Acolyte</option>
            <option value="" className="create__form--select-item">Charlatan</option>
            <option value="" className="create__form--select-item">Criminal</option>
            <option value="" className="create__form--select-item">Entertainer</option>
            <option value="" className="create__form--select-item">Folk Hero</option>
            <option value="" className="create__form--select-item">Guild Artisan</option>
            <option value="" className="create__form--select-item">Hermit</option>
            <option value="" className="create__form--select-item">Noble</option>
            <option value="" className="create__form--select-item">Outlander</option>
            <option value="" className="create__form--select-item">Sage</option>
            <option value="" className="create__form--select-item">Sailor</option>
            <option value="" className="create__form--select-item">Soldier</option>
            <option value="" className="create__form--select-item">Urchin</option>
        </select>    

        <div className='create__form--buttons'>
            <Link className='create__form--cancel' to='/characters'>Cancel</Link>
            <button className='create__form--submit' type='submit'>Submit</button>    
        </div> 

      </div>
  </div>
  )}

export default CreateCharacter
