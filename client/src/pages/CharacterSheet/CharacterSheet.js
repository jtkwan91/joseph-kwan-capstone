import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCharacter } from '../../Api';
import './CharacterSheet.scss'

function CharacterSheet() {

  const [charDetails, setCharDetails] = useState(null)
  const params = useParams()

  useEffect(() => {
    getCharacter(params.id)
    .then(setCharDetails)
    .catch((err) => { 
      console.error(err.message)
    })
  },[params.id])

    return <div className='sheet'>
      <div className='sheet__card'>
        {charDetails
        ? <>
        <pre></pre>
          <pre>{JSON.stringify(charDetails, null, 2)}</pre>
            <CharDetails charDetails={charDetails} /> 
            <Core charDetails={charDetails} />
            <Abilities charDetails={charDetails} />
            <WeaponsSpells charDetails={charDetails} />
            <MiscData charDetails={charDetails} />
          </>
        : <p>Loading...</p>
        }
      </div>
    </div>;
  }

  export default CharacterSheet;

  function CharDetails({charDetails}) {
    return <div className="sheet__details">
      avatar, name, race, subrace, class, archetype, background, exp, lvl go here
      <h3>{charDetails.name}</h3>
      <img src={charDetails.avatar} alt="avatar" />

    </div>
  }

  function Core({charDetails}) {
    
    return <div className='sheet__core'>
      AC, initiative, speed, current hp, max hp, temp hp, hit dice, death saves, proficiency bonus, inspiration go here
    </div>
  }

  function Abilities({charDetails}) {

      return <div className='sheet__abilities'>
          ability scores, saving throws, skills, passive wisdom go here
      </div>
  }

  function WeaponsSpells({charDetails}) {
    
    return <div className='sheet__wep-spells'>
      weapons and spells go here
    </div>
  }

  function MiscData({charDetails}) {
    
    return <div className='sheet__misc'>
      features, proficiencies, languages, equipment list, personality etc. go here
    </div>
}